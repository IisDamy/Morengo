import { CreateUserParams, GetMenuParams, SignInParams, UpdateUserProps } from "@/types";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as Linking from 'expo-linking';
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


// # dont forget to delete this and add complete eas build for secrets before launch
// # use eas secret:list to get already created secrets

// # use this to replace keys
// # import Constants from 'expo-constants';
// # const { appwriteDatabaseId, appwriteProjectId } = Constants.expoConfig.extra;


export const appwriteConfig = {

  // # dont forget to delete this and add complete eas build before launch


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
    const redirectUri = Linking.createURL('/') 

    const loginUrl = await account.createOAuth2Token({
    provider: OAuthProvider.Google,
    success:redirectUri
});
  if(!loginUrl) throw new Error('Failed to login')

const result = await WebBrowser.openAuthSessionAsync(`${loginUrl}`, redirectUri);

if (result.type !== 'success' || !result.url) {
    throw new Error('Failed to login');
}

const url = new URL(result.url);
const secret = url.searchParams.get('secret')?.toString();
const userId = url.searchParams.get('userId')?.toString();

if(!secret || !userId) throw new Error('Failed to login')
// Create session with OAuth credentials
const session = await account.createSession({
    userId,
    secret
});

if (!session) throw new Error('Failed to create session')
return true
  } catch (e) {
    console.error(e)
    return false
  }
};



export const signOut = async () => {
  try {
     await account.deleteSession({ sessionId: "current" });
     return true
  } catch (error) {
    console.error("Sign Out Error:", error);
    return false
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

    if (!currentAccount) throw Error;
    return currentUser.rows[0];
  } catch (e) {
    throw new Error(e as string);
  }
};



// call this function periodically to refresh OAuth token
// call when user visits app
// export const OAuthRefreshToken = async () => {
//   try {
//     let session = await account.getSession({ sessionId: "current" });
//     //  don't know if this actually updates at expiry
//     if (
//       session?.providerAccessTokenExpiry &&
//       new Date(session.providerAccessTokenExpiry) === new Date()
//     ) {
//       const newSession = await account.updateSession({ sessionId: "current" });
//     }
//   } catch (e) {
//     throw new Error(e as string);
//   }
// };

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


export const recoverPassword = async (email:string)=>{
  try{

    const redirectUri = Linking.createURL('/') 
     await account.createRecovery({
      email,
      url:redirectUri
    })

    return { success: true };

  }
catch(e:any){
  console.error(e)
  return {
      success: false,
      message: e?.message || "Failed to initiate password recovery",
    };
}
}


// can make this general function for updating where we set tableid, pass accountid and pass data
// finish ts
export const updateUser = async ({name, institution, accountId, number }:User) => {
try{

  const promise = await tablesDB.updateRow({
    databaseId:appwriteConfig.databaseId,
    tableId:'user',
    rowId:accountId,
    data:{
      name,
      institution,
      number,


    }
  })
}
catch(e){
  throw new Error(e as string)
}
}
// probably going to use ai to make all components
