import {useAuth0, Auth0Provider} from 'react-native-auth0';
import { Button } from 'react-native';
import React from 'react';

const LogoutButton = () => {
    const {clearSession} = useAuth0();

    const onPress = async () => {
        try {
            await clearSession();
        } catch (e) {
            console.log(e);
        }
    };

    return <Button onPress={onPress} title="Log out" />
}

export default LogoutButton;