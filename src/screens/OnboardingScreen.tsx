import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useRef, useTransition} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  FlatList,
  Image,
  Text,
  Pressable,
} from 'react-native';
import {RootStackParamList} from '../types/AppNavigation';

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'OnboardingScreen'
>;

interface Props extends NavigationProps {}

interface PropsComponent {
  scrollX: Animated.Value;
  nextAction?: () => void;
  index?: number;
}

const SCREEN_DATA = [
  {
    id: 'onboarding-1',
    image: require('../assets/images/onboarding/onboarding-1.png'),
    title: 'Welcome to careerspace',
    backgroundColor: '#DCC1FF',
  },
  {
    id: 'onboarding-2',
    image: require('../assets/images/onboarding/onboarding-2.png'),
    title: 'Get support in your new career',
    backgroundColor: '#F7CE45',
  },
  {
    id: 'onboarding-3',
    image: require('../assets/images/onboarding/onboarding-3.png'),
    title: 'Learn and practice',
    backgroundColor: '#AB93E0',
  },
  {
    id: 'onboarding-4',
    image: require('../assets/images/onboarding/onboarding-4.png'),
    title: "Let's start your career!",
    backgroundColor: '#DCC1FF',
  },
];

const {width, height} = Dimensions.get('screen');

const Backdrop: React.FC<PropsComponent> = props => {
  const {scrollX} = props;
  const backgroundColor = scrollX.interpolate({
    inputRange: SCREEN_DATA.map((_, i) => i * width),
    outputRange: SCREEN_DATA.map(item => item.backgroundColor),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: backgroundColor,
        },
      ]}
    />
  );
};

const Indicator: React.FC<PropsComponent> = props => {
  const {nextAction, index: indexScroll} = props;
  return (
    <View style={{position: 'absolute', bottom: 48}}>
      {indexScroll && indexScroll < SCREEN_DATA.length ? (
        <Pressable
          onPress={() => {
            nextAction && nextAction();
          }}
          style={{
            paddingHorizontal: 80,
            paddingVertical: 13,
            borderWidth: 2,
            borderRadius: 99,
          }}>
          <Text style={{fontFamily: 'Oddval-SemiBold', fontSize: 16}}>
            Next
          </Text>
        </Pressable>
      ) : (
        <View>
          <Pressable
            style={{
              paddingHorizontal: 80,
              paddingVertical: 13,
              borderRadius: 99,
              backgroundColor: '#F5F378',
            }}>
            <Text style={{fontFamily: 'Oddval-SemiBold'}}>Sign in</Text>
          </Pressable>
          <Pressable
            style={{
              paddingHorizontal: 80,
              paddingVertical: 13,
              borderRadius: 99,
              marginTop: 12,
              backgroundColor: '#fff',
            }}>
            <Text style={{fontFamily: 'Oddval-SemiBold'}}>Sign up</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const OnboardingScreen: React.FC<Props> = props => {
  const flatlistRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [scrollIndex, setScrollIndex] = React.useState(1);

  const [isPending, startTransition] = useTransition();
  const nextAction = () => {
    if (scrollIndex < SCREEN_DATA.length && flatlistRef) {
      setScrollIndex(scrollIndex + 1);
      startTransition(() => {
        flatlistRef.current?.scrollToOffset({
          offset: width * scrollIndex,
          animated: true,
        });
      });
    }
  };
  return (
    <View style={styles.container}>
      <Backdrop scrollX={scrollX} />
      <Animated.FlatList
        ref={flatlistRef}
        data={SCREEN_DATA}
        scrollEventThrottle={32}
        pagingEnabled
        horizontal
        scrollEnabled={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 12,
              }}>
              <Text
                style={{
                  fontFamily: 'Oddval-SemiBold',
                  fontSize: 38,
                  textAlign: 'center',
                  color: '#000',
                }}>
                {item.title}
              </Text>
              <Image source={item.image} />
            </View>
          );
        }}
      />
      <Indicator
        nextAction={nextAction}
        scrollX={scrollX}
        index={scrollIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default OnboardingScreen;
