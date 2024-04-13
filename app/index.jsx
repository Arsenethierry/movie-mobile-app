import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/custom-button';

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode='contain'
          />
          <Image
            source={images.cards}
            className="w-[380px] h-[300px]"
            resizeMode='contain'
          />

          <View className="relative mt-5">
            <Text className="text-center text-3xl text-white">
              Discover Endless Possibilities with {' '}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              resizeMode='contain'
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
            />
          </View>
          <Text className="text-gray-100 text-sm font-pregular mt-7 text-center">
            Where creativity meets innovation: embark on a journey of limitless exploration with Aora.
          </Text>

          <CustomButton
            title={'Continue with Email'}
            containerStyles={'w-full mt-7'}
            handlePress={() => router.push('/sign-in')}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  );
}
