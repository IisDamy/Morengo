import { Text, View, Button, TouchableOpacity, Image, Alert } from 'react-native'
import React, { Component, useState, useRef, useEffect } from 'react'
import { Link, router } from 'expo-router'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { color } from '@/constants'
import { createUser } from '@/lib/appwrite'
import { CustomDropdown } from '@/components'
import PasswordStrengthMeter from '@/components/PasswordStrengthMeterBar'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function SignUp() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form, setForm] = useState({email:'', password:'', name:'', number:'', institution:''});
    const [strengthScore, setStrengthScore] = useState(-1)

    const isPasswordValid = strengthScore >=2


    const submit = async ()=>{
        const { name, email, password, institution, number } = form;


          try {
        if(!form.name || !form.email || !form.password) throw Error('Please enter valid email address and password')
        if(!form.number || !form.institution) throw Error('Please fill all the fields')
         if(!isPasswordValid) throw Error("Please choose a stronger password.");
        if(form.number.length != 11) throw Error('Number must be 11 digits')
     
        setIsSubmitting(true);
        await createUser({ email,  password,  name, institution, number });

            router.replace('/(tabs)');
        } catch(error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setIsSubmitting(false);
        }
    }
    
    const oAuthSubmit = async ()=>{

    }

    return (
      <View className='gap-10 bg-white pb-20 rounded-lg p-5 mt-5'>
           <View className='absolute top-[-320]  w-screen '>
                    {/* obviously cha */}
                    <Text className='text-white text-3xl text-center'
                       style={{
                                        fontFamily: "Crispy",
                                        color: color.morange,
                                        letterSpacing: 0,
                                        textShadowColor: "white",
                                        textShadowOffset: { width: -0.5, height: 0.5 },
                                        textShadowRadius: 0.6,
                                      }}
                    >sign up</Text>
                </View>
        <View className='flex-row items-center mt-4 mb-0'>
            <Text className='text-left tracking-wide'>Already have an account? <Link href={'./sign-in'} className='text-green-300'>
                Sign In
            </Link></Text>
            
        </View>
        
         <CustomInput
        placeholder='Enter your name'
        value={form.name} 
        onChangeText={(text)=>{
            setForm({...form, name:text})
        }}
        label="Name"/>

        <CustomInput
        placeholder='Enter your email'
        value={form.email} 
        onChangeText={(text)=>{
            setForm({...form, email:text})
        }}
        label="Email"
        keyboardType="email-address"/>

        
        <View className='gap-2'>
            <CustomInput
        placeholder='Enter your password'
        value={form.password} 
        onChangeText={(text)=>{
            setForm({...form, password:text})
        }}
        label="Password"
        secureTextEntry={true}

        />

        {form.password &&<PasswordStrengthMeter password={form.password}  onStrengthChange={(score) => setStrengthScore(score)}/>}

        </View>
         
        <CustomInput
                placeholder='Enter your number'
                value={form.number} 
                onChangeText={(text)=>{
                    setForm({...form, number:text})
                }}
                label="Number"
                keyboardType='numeric'
                maxLength={11}
                secureTextEntry={false}
                />

    <CustomDropdown value={form.institution} onValueChange={(value) => setForm({...form, institution:value})}/>

       <CustomButton
       title="Create Account"
       onPress={submit} 
         style={`bg-[#57a886] mt-6`}
       />
       
  
      </View>
    )
  
}
