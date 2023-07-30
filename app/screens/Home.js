import { useState, useEffect } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import CartoonScroller from '../components/CartoonScroller';
import ReviewList from '../components/ReviewList';
import { ScrollView } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { baseUrl } from '../constants/url';
import { useIsFocused } from '@react-navigation/native';
import { useProtectedPage } from '../hooks/useProtectedPage';

const DATA = [
    {
        "_id": "64a7437b62d4733a9c26c60e",
        "title": "Spongebob Squarepants",
        "picture": "https://nick.mtvnimages.com/uri/mgid:arc:content:nick.com:9cd2df6e-63c7-43da-8bde-8d77af9169c7?quality=0.7",
        "director": "Stephen Hillenburg",
        "genre": [
            "Comedy",
            "Family"
        ],
        "year": 1999,
        "nrating": 0,
        "trating": 0,
        "avgrating": 0,
        "nfavorites": 0,
        "description": "A square yellow sponge named SpongeBob SquarePants lives in a pineapple with his pet snail, Gary, in the city of Bikini Bottom on the floor of the Pacific Ocean."
    },
    {
        "_id": "64a744d662d4733a9c26c612",
        "title": "Bojack Horseman",
        "picture": "https://m.media-amazon.com/images/M/MV5BYWQwMDNkM2MtODU4OS00OTY3LTgwOTItNjE2Yzc0MzRkMDllXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
        "director": "Raphael Bob-Waksberg",
        "genre": [
            "Drama",
            "Comedy"
        ],
        "year": 2014,
        "nrating": 0,
        "trating": 0,
        "avgrating": 0,
        "nfavorites": 0,
        "description": "A humanoid horse, BoJack Horseman -- lost in a sea of self-loathing and booze -- decides it's time for a comeback. Once the star of a '90s sitcom, in which he was the adoptive father of three orphaned kids (two girls and a boy)."
    },
    {
        "_id": "64a7442062d4733a9c26c60f",
        "title": "The Simpsons",
        "picture": "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
        "director": "Matt Groening",
        "genre": [
            "Comedy"
        ],
        "year": 1999,
        "nrating": 0,
        "trating": 0,
        "avgrating": 0,
        "nfavorites": 0,
        "description": "This long-running animated comedy focuses on the eponymous family in the town of Springfield in an unnamed U.S. state."
    },
    {
        "_id": "64a7445862d4733a9c26c610",
        "title": "Star vs the Forces of Evil",
        "picture": "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
        "director": "Stephen Hillenburg",
        "genre": [
            "Action",
            "Adventure"
        ],
        "year": 1999,
        "nrating": 0,
        "trating": 0,
        "avgrating": 0,
        "nfavorites": 0,
        "description": "When magical princess Star Butterfly receives a royal magic wand for her 14th birthday, she proves to her parents that she is not ready for the responsibility that comes with it."
    },
    {
        "_id": "64a7449b62d4733a9c26c611",
        "title": "Gravity Falls",
        "picture": "https://m.media-amazon.com/images/M/MV5BMTEzNDc3MDQ2NzNeQTJeQWpwZ15BbWU4MDYzMzUwMDIx._V1_SY1000_CR0,0,641,1000_AL_.jpg",
        "director": "Alex Hirsch",
        "genre": [
            "Adventure",
            "Comedy"
        ],
        "year": 2012,
        "nrating": 0,
        "trating": 0,
        "avgrating": 0,
        "nfavorites": 0,
        "description": "Twins Dipper and Mabel Pines are sent to spend the summer with their great-uncle, Grunkle Stan, in the mysterious town of Gravity Falls, Ore."
    },{
        "_id": "64a7437b62d4ASfaASc26c60e",
        "title": "Spongebob Squarepants",
        "picture": "https://nick.mtvnimages.com/uri/mgid:arc:content:nick.com:9cd2df6e-63c7-43da-8bde-8d77af9169c7?quality=0.7",
        "director": "Stephen Hillenburg",
        "genre": [
            "Comedy",
            "Family"
        ],
        "year": 1999,
        "nrating": 0,
        "trating": 0,
        "avgrating": 0,
        "nfavorites": 0,
        "description": "A square yellow sponge named SpongeBob SquarePants lives in a pineapple with his pet snail, Gary, in the city of Bikini Bottom on the floor of the Pacific Ocean."
    },
    {
        "_id": "64ASfASF062d4733a9c26c60f",
        "title": "The Simpsons",
        "picture": "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
        "director": "Matt Groening",
        "genre": [
            "Comedy"
        ],
        "year": 1999,
        "nrating": 0,
        "trating": 0,
        "avgrating": 0,
        "nfavorites": 0,
        "description": "This long-running animated comedy focuses on the eponymous family in the town of Springfield in an unnamed U.S. state."
    },
    {
        "_id": "64a74458ASDASF733a9c26c610",
        "title": "Star vs the Forces of Evil",
        "picture": "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
        "director": "Stephen Hillenburg",
        "genre": [
            "Action",
            "Adventure"
        ],
        "year": 1999,
        "nrating": 0,
        "trating": 0,
        "avgrating": 0,
        "nfavorites": 0,
        "description": "When magical princess Star Butterfly receives a royal magic wand for her 14th birthday, she proves to her parents that she is not ready for the responsibility that comes with it."
    },
    {
        "_id": "64a7ASfas2d4733a9c26c611",
        "title": "Gravity Falls",
        "picture": "https://m.media-amazon.com/images/M/MV5BMTEzNDc3MDQ2NzNeQTJeQWpwZ15BbWU4MDYzMzUwMDIx._V1_SY1000_CR0,0,641,1000_AL_.jpg",
        "director": "Alex Hirsch",
        "genre": [
            "Adventure",
            "Comedy"
        ],
        "year": 2012,
        "nrating": 0,
        "trating": 0,
        "avgrating": 0,
        "nfavorites": 0,
        "description": "Twins Dipper and Mabel Pines are sent to spend the summer with their great-uncle, Grunkle Stan, in the mysterious town of Gravity Falls, Ore."
    },
    {
        "_id": "64a744aSDAS2asdASDc26c612",
        "title": "Bojack Horseman",
        "picture": "https://m.media-amazon.com/images/M/MV5BYWQwMDNkM2MtODU4OS00OTY3LTgwOTItNjE2Yzc0MzRkMDllXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
        "director": "Raphael Bob-Waksberg",
        "genre": [
            "Drama",
            "Comedy"
        ],
        "year": 2014,
        "nrating": 0,
        "trating": 0,
        "avgrating": 0,
        "nfavorites": 0,
        "description": "A humanoid horse, BoJack Horseman -- lost in a sea of self-loathing and booze -- decides it's time for a comeback. Once the star of a '90s sitcom, in which he was the adoptive father of three orphaned kids (two girls and a boy)."
    },
]

const sampleReviews = [
    {
        "_id": "1",
        "cartoon_id": "1",
        "user_id": "1",
        "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "rating": "4",
        "fav": "true"
    }, 
    {
        "_id": "2",
        "cartoon_id": "1",
        "user_id": "1",
        "comment": "huge slay",
        "rating": "4",
        "fav": "true"
    }, 
    {
        "_id": "3",
        "cartoon_id": "1",
        "user_id": "1",
        "comment": "huge slay",
        "rating": "4",
        "fav": "true"
    }
]

const Home = ({navigation}) => {
    // TESTING PURPOSES ONLY
    const [user, setUser] = useState({})
    const isFocused = useIsFocused()

    useProtectedPage();

    useEffect(() => {
        if (isFocused) fetchUsername()
    }, [isFocused])

    const fetchUsername = async () => {
        // get it from react native's async storage
        try {
            const val = await AsyncStorage.getItem('USERNAME');
            if (val !== null) {
                fetchUser(username)
            }
            else {
                // set a guest user
                setUser({
                    username: "Guest",
                    watchlist: DATA,
                    favcartoons: DATA,
                    twatched: DATA
                })
            }
        } catch(error) {
            console.log(error)
        }
    }

    const fetchUser = async (username) => {
        const urlEnd = `/users/oneuser`

        await axios.get(`${baseUrl}${urlEnd}`, { params: { username: username }}).then((response) => {
            if (response) {
                setUser(response.data)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        // Use `setOptions` to update the button that we previously specified
        navigation.setOptions({
            headerRight: () => (
                <Ionicons name="search-outline" onPress={() => navigation.navigate('Search')} size={20}/>
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView className="flex-1 bg-[#1F1D36] p-4">
            <ScrollView scrollEnabled={true}>
                <Text className="text-white font-bold text-lg">Hello, <Text className="text-rose-300">{user.username}</Text>!</Text>
                <Text className="text-white">Review or track cartoons you've watched...</Text>
                <CartoonScroller cartoons={user.favcartoons} title="Favorite Cartoons"/>
                <CartoonScroller cartoons={user.watchlist} title="My Watchlist"/>
                <CartoonScroller cartoons={user.twatched} title="To Watch"/>
                <ReviewList reviews={sampleReviews} title="Recent Reviews"/> 
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;