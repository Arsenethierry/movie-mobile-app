import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/search-input'
import Trending from '../../components/trending'
import EmptyState from '../../components/empty-state'
import { getAllPosts, getLatesPosts } from '../../lib/appwrite'
import { useAppwrite } from '../../lib/useAppwrite'
import VideoCard from '../../components/video-card'

const Home = () => {
  const { data: posts, refetch, isLoading } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatesPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    await refetch();

    setRefreshing(false);
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-center flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="font-psemibold text-white">JSMastery</Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No Videos Created yet"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home