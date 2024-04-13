import { View, Text, Image, ScrollView, Dimensions, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/form-field'
import { useState } from 'react';
import { Link, router } from "expo-router"
import CustomButton from "../../components/custom-button";
import { signin } from '../../lib/appwrite';

export default function SignIn() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    
    const submit = async () => {
        if(!form.email || !form.password) {
          Alert.alert('Error', 'Please fill all the fields')
        }
    
        setIsSubmitting(true);
    
        try {
          await signin(form.email, form.password);
    
          router.replace('/home')
        } catch (error) {
          Alert.alert('Error', error.message)
        } finally {
          setIsSubmitting(false);
        }
      }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View
                    className="w-full flex items-center h-full px-4 my-6"
                    style={{
                        minHeight: Dimensions.get("window").height - 100,
                    }}
                >
                    <Image
                        source={images.logo}
                        resizeMode='contain'
                        className="w-[115px] h-[35px]"
                    />

                    <Text className="text-2xl text-white mt-10 font-psemibold">Log In to Aora</Text>

                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyBoardType="email-address"
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-7"
                    />

                    <CustomButton
                        title="Sign In"
                        handlePress={submit}
                        containerStyles="mt-7 w-full"
                        isLoading={isSubmitting}
                    />

                    <View className="flex justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Don't have an account?
                        </Text>
                        <Link
                            href="/sign-up"
                            className="text-lg font-psemibold text-secondary"
                        >
                            Sign Up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}