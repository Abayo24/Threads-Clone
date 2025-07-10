import { Text, View, FlatList } from 'react-native';
import { dummyPosts } from '@/dummyData';
import PostListItem from '@/components/PostListItem';

export default function HomeScreen() {
  return (
    <FlatList
      data={dummyPosts}
      renderItem={({ item }) => (
        <PostListItem post={item} />
      )}
    />
  );
}

