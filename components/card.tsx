import { Avatar, Card, Text, Icon, } from "@rneui/themed";
import { View, Button } from 'react-native'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { cardStyles } from '@/assets/styles/community-styles'

const CardComponent = ({ item }) => {
    return (
        <Card>
            <View style={cardStyles.cardHeader}>
                <Avatar
                    size={50}
                    rounded
                    source={{ uri: item.avatarUrl }}
                />
                <View style={cardStyles.cardUserInfo}>
                    <Text style={cardStyles.text_lev2}>{item.name}</Text>
                    <Text style={cardStyles.text_lev3}>{item.date}</Text>
                </View>
                <Text h1 style={cardStyles.cardExtension}>...</Text>
            </View>
            <Card.Image
                source={{ uri: item.imageUri }}
            />
            <Text style={cardStyles.text_lev1}>{item.activity}</Text>
            <Text>{item.location}</Text>
            <View style={cardStyles.explorationInfo}>
                <Text style={cardStyles.text_lev3}>Length</Text>
                <Text>{item.length}</Text>
                <Text style={cardStyles.text_lev3}>Time</Text>
                <Text>{item.time}</Text>
            </View>
            <Text>{item.comment}</Text>
            <View style={cardStyles.likeAndComment}>
                <View style={cardStyles.cardIcon}>
                    <MaterialCommunityIcons name="cards-heart-outline" size={24} color="#237804" />
                    <Text>Like</Text>
                </View>
                <View style={cardStyles.cardIcon}>
                    <FontAwesome5 name="comment" size={20} color="#237804" />
                    <Text>Comment</Text>
                </View>
            </View>

        </Card>
    )
}

export default CardComponent;