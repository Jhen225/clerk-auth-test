import React, { useEffect, useState } from 'react'
import { Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { useAuth } from '@clerk/clerk-expo';

export default function DashboardComponent (props) {
    const [token, setToken] = useState(null);
    const { signOut, getToken } = useAuth();

    async function logout () {
        console.log('pressed')
        await signOut();
    }

    async function fetchActivePlans () {

        const t = await getToken()
        // await fetchToken()
        const res = await fetch(API_URL, {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": t }
        });

        if (res.status != 200) {
            return console.log(res.status);
        }

        const json = await res.json();
        // console.log(json);

    }

    async function fetchToken () {
        
        setToken(t);
    }

    useEffect(() => {
        fetchActivePlans().then().catch(err => console.log(err.message))
    }, [])

    return (
        <View>
            <Text>Dashboard Component</Text>
            <TouchableWithoutFeedback
                onPress={logout}
            >
                <View 
                    style={{ justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: 'orange'}}
                >
                    <Text>Logout</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}