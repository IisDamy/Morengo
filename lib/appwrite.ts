import { CreateUserParams, GetMenuParams, SignInParams } from "@/types";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  OAuthProvider,
  Query,
  TablesDB,
} from "react-native-appwrite";
import { User } from "@/types";



export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT!,
  databaseId: "69736bf7000636aa3743",
  userCollectionId: "user",
  tableId: "",
  cartCollectionId: "",
  vendorsCollectionId: "",
  ordersCollectionId: "",
  paymentsCollectionId: "",
  reviewsCollectionId: "",
  menuCollectionId: "",
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform("com.Morengo.DeliverU");

export const account = new Account(client);
export const databases = new Databases(client);
export const tablesDB = new TablesDB(client);
// if avatars means what i think it means, remove
const avatars = new Avatars(client);

export const createUser = async ({
  email,
  password,
  name,
  institution,
  number,

}: CreateUserParams) => {
  try {
    // does this depracation affect functionality
    const newAccount = await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });
    if (!newAccount) throw Error;
    await SignIn({ email, password });

    // let avatarUrl = avatars.getInitialsURL(name);

    await tablesDB.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.userCollectionId,
      rowId: ID.unique(),
      data: {
        accountId: newAccount.$id,
        email,
        name,
        // avatar: avatarUrl,
        institution,
        number,
      },
    });
  } catch (e) {
    throw new Error(e as string);
  }
};

export const SignIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession({
      email,
      password,
    });
  } catch (e) {
    throw new Error(e as string);
  }
};


export const OAuthSignIn = async () => {
  try {
    const deepLink = new URL(makeRedirectUri({ preferLocalhost: true }));
const scheme = `${deepLink.protocol}//`;



const loginUrl = await account.createOAuth2Token({
    provider: OAuthProvider.Google,
    success: `${deepLink}`,
    failure: `${deepLink}`,
});

const result = await WebBrowser.openAuthSessionAsync(`${loginUrl}`, scheme);

if (result.type !== 'success' || !result.url) {
    throw new Error('OAuth authentication failed or was cancelled');
}

const url = new URL(result.url);
const secret = url.searchParams.get('secret');
const userId = url.searchParams.get('userId');

// Create session with OAuth credentials
await account.createSession({
    userId,
    secret
});
  } catch (e) {
    console.error("=== OAuth Sign In Error ===");
    console.error("Error details:", e);
    console.error("Error message:", e instanceof Error ? e.message : String(e));
    throw new Error(
      `OAuth sign-in failed: ${e instanceof Error ? e.message : String(e)}`,
    );
  }
};



export const signOut = async () => {
  try {
    await account.deleteSession({ sessionId: "current" });
  } catch (error) {
    console.error("Sign Out Error:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    console.log("Appwrite endpoint:", appwriteConfig.endpoint);
    const currentAccount = await account.get();
    
    if (!currentAccount) throw Error;

    const currentUser = await tablesDB.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.userCollectionId,
      queries: [Query.equal("accountId", currentAccount.$id)],
    });
    console.log(currentUser)
    if (!currentAccount) throw Error;
    return currentUser.rows[0];
  } catch (e) {
    throw new Error(e as string);
  }
};




// call this function periodically to refresh OAuth token
// call when user visits app
export const OAuthRefreshToken = async () => {
  try {
    let session = await account.getSession({ sessionId: "current" });
    //  don't know if this actually updates at expiry
    if (
      session?.providerAccessTokenExpiry &&
      new Date(session.providerAccessTokenExpiry) === new Date()
    ) {
      const newSession = await account.updateSession({ sessionId: "current" });
    }
  } catch (e) {
    throw new Error(e as string);
  }
};

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];

    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.search("name", query));

    // change listdocuments
    const menus = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries,
    );

    return menus.documents;
  } catch (e) {
    throw new Error(e as string);
  }
};

// update this,i just coppied getmenu, make changes
export const getOrders = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];

    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.search("name", query));

    // change listdocuments
    const menus = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries,
    );

    return menus.documents;
  } catch (e) {
    throw new Error(e as string);
  }
};

// addresses should be also saved in local storage

export const createOrder = async ({
  itemId,
  quantity,
  addressId,
}: {
  itemId: string;
  quantity: number;
  addressId: string;
}) => {
  try {
    const order = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.orderCollectionId,
      {
        itemId,
        quantity,
        addressId,
      },
    );
    return order;
  } catch (e) {
    throw new Error(e as string);
  }
};

// can make this general function for updating where we set tableid, pass accountid and pass data
// finish ts
export const updateUser = async <Models.Document & T>(accountId:string, data:Partial) => {
try{
  const promise = await tablesDB.updateRow({
    databaseId:appwriteConfig.databaseId,
    tableId:'user',
    rowId:accountId,
    data
  })
}
catch(e){
  throw new Error(e as string)
}
}
// probably going to use ai to make all components
