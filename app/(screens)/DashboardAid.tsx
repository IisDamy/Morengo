import { View, Text, TouchableOpacity,Pressable, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import CustomPopUp from '@/components/CustomPopUp'

// YOU CAN STARTING FILLING OUT INFORMATION NOW WITH INFO FROM ONLINE
// remove router, this actually should be in dashboard and pop up
// on screen with the button you clicked being at top as input field
// height should be maybe about 70 / 80 /90 % of screen, display absolute, z-index-3/4
// bottom-0 with cancel button to remove
// should not be routed from dashboard but should be an extension of button that's display is none
// also add opacity fade when removing and bringing up, transitions from button location to about 70% of screen with smooth opacity fade
// {/*didn't find what you're looking for leads to 2 options, 1 how to prefix your searches eg instead of typing where can i find, write where is, 2nd is submit  To improve accuracy, you can submit corrections for database training. which leads to page for adding or updating data*/} 
// open default should be false when adding to api
// don't forget point system,use mock data but fill in tech so you don't forget
// when searching for item, also search through descriptions but return only title on display
// page can have a light/ dark switch
 {/* add utility to slice cut text short if lenght is too much, text should be able to fall to at most 2 more lines, after that, cut and show ... */}
  {/* description pops uo when title is clicked */}
{/* or better option i think clicking title removes other stuff out of page and returns a new page with title as header and description under*/}
const data = [
    {   id:'1',
        title:'Where is school auditorioum located?',
        description:"You can find unilorin auditorium near park, you can ask from directions from park"
    },
       {id:'2',
        title:'Where is school clinic?',
        description:"You can find unilorin auditorium near park, you can ask from directions from park"
    },
       {id:'3',
        title:'Where is senate building?',
        description:"You can find unilorin auditorium near park, you can ask from directions from park"
    },
       {id:'4',
        title:'What is the password of my school email?',
        description:"You can find unilorin auditorium near park, you can ask from directions from park"
    },
       {id:'5',
        title:'Where is school mosque located?',
        description:"You can find unilorin auditorium near park, you can ask from directions from park"
    },
       {id:'6',
        title:'Which chuches ?',
        description:"You can find unilorin auditorium near park, you can ask from directions from park"
    },
       {id:'7',
        title:'Where can i get ?',
        description:"You can find unilorin auditorium near park, you can ask from directions from park"
    },
       {id:'8',
        title:'Where is school auditorioum located?',
        description:"You can find unilorin auditorium near park, you can ask from directions from park"
    },
       {id:'9',
        title:'Where is school auditorioum located?',
        description:"You can find unilorin auditorium near park, you can ask from directions from park"
    },
       {id:'10',
        title:'Where is school auditorioum located?',
        description:"You can find unilorin auditorium near park, you can ask from directions from park"
    },
       {id:'11',
        title:'Where is school auditorioum located?',
        description:"You can find unilorin auditorium near park, you can ask from directions from park"
    },
       {id:'12',
        title:'Where is school auditorioum located?',
        description:"You can find unilorin auditorium near park, you can ask from directions from park"
    },
    {
        id:'13',
        title:'Where is the zoo located?',
        description:''
    },
       {
        id:'14',
        title:'What animals does unilorin have in its zoo?',
        description:''
    },
        {
        id:'15',
        title:'Who is the dean?',
        description:''
    },
        {
        id:'16',
        title:'Where is the deans office?',
        description:''
    },
            {
        id:'17',
        title:'Who is Engr so and so{this info can probaly be gotten from portal or end of year book, or probalbly a site}?',
        description:''
    },
      {
        id:'18',
        title:'Who is Engr so and so{this info can probaly be gotten from portal or end of year book, or probalbly a site}?',
        description:''
    }
]

interface ItemProps {
    title: string;
    description: string;
    id: string;
}




const DashboardAid = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const cutText = (text: string) => text.length > 31 ? text.slice(0, 10) + "..." : text

    const handleItemPress = (id: string) => {
        if (selectedId === id) {
            setIsOpen(false)
            setSelectedId(null)
        } else {
            setIsOpen(true)
            setSelectedId(id)
        }
    }

    const Item = ({item}: {item: ItemProps}) => {
        const open = item.id === selectedId && isOpen

        return (
             <View className='mt-1 p-0'>
            <TouchableOpacity onPress={() => handleItemPress(item.id)}>
                    <Text className='p-2 text-white bg-zinc-700 mx-auto w-fit text-center  rounded-full py-2 bg-transparent'>
                        {open? item.title : cutText(item.title)}
                    </Text>
            </TouchableOpacity>  
                    <Text className={`p-2 py-4 mx-4 mt-1 bg-white  border  w-fit h-fit ${open?'':'hidden'}`}>
                        {item.description}
                    </Text>
            
            </View>
        )
    }

    return (
        <SafeAreaView className='bg-zinc-800 flex items-center pt-4 h-screen'>

                <StatusBar
                    style='light'
                    backgroundColor={"transparent"}
                    translucent
                />
                
                <View className='w-32 h-16'
                    style={{
                        backgroundColor:'#f8fcec87',
                        borderRadius: 18
                    }}
                >
                    <TextInput 
                        className='text-xl my-auto text-center'
                        placeholder=''
                    />      
                </View>
                <CustomPopUp />
                <Pressable>
                {'txt should be smaller'}
                <Text className='text-yellow-100 text-sm text-white w-44 text-center mb-6  my-8 '
                    style={{
                        lineHeight:18
                    }}
                >Didn't find what you were looking for?
                </Text>
                </Pressable>
                

                    <FlatList
                        data={data} 
                        renderItem={({item}) => <Item item={item} />}
                        keyExtractor={(item: ItemProps) => item.id}
                        extraData={selectedId}
                        contentContainerClassName='flex-row  p-3 gap-2 items-center justify-center w-screen  flex-wrap'
                    />
                    
                <Text>Submit corrections to improve future responses.</Text>
                <Text>popup: Point system: earn points that can be redeemed in morengo foods by submitting accurate corrections to our database</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text className='text-white'>DashboardAid</Text>
                </TouchableOpacity>
         
        </SafeAreaView>
    )
}

export default DashboardAid
