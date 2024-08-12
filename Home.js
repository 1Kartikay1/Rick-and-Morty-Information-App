import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import Svg, { Path, Circle, Polyline, Line } from "react-native-svg";

const Home = ({ navigation }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => {
        setCards(data.results.slice(0, 3)); // Get the first 3 characters
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100"
        height="100"
        viewBox="0 0 48 48"
      >
        <Path
          fill="#ffe082"
          d="M37.828,32.483c-0.365,0-0.71,0.074-1.034,0.19v-4.846C36.793,22.4,33.428,18,28,18	s-8.793,4.4-8.793,9.828v4.846c-0.325-0.116-0.669-0.19-1.034-0.19c-1.714,0-3.103,1.389-3.103,3.103	c0,1.714,1.389,3.103,3.103,3.103c0.365,0,0.71-0.074,1.034-0.19v1.742C19.207,45.669,24.379,48,28,48s8.793-2.331,8.793-7.759	v-1.742c0.325,0.116,0.669,0.19,1.034,0.19c1.714,0,3.103-1.389,3.103-3.103C40.931,33.872,39.542,32.483,37.828,32.483z"
        ></Path>
        <Circle cx="21.5" cy="28.5" r="2.5" fill="#18193f"></Circle>
        <Circle cx="26.5" cy="28.5" r="2.5" fill="#18193f"></Circle>
        <Path
          fill="none"
          stroke="#18193f"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="M15.5,28.684	c-0.314-0.112-0.647-0.184-1-0.184c-1.657,0-3,1.343-3,3c0,1.657,1.343,3,3,3c0.353,0,0.686-0.072,1-0.184V36c0,5.247,5,7.5,8.5,7.5	c0.091,0,0.183-0.002,0.276-0.005"
        ></Path>
        <Path
          fill="none"
          stroke="#18193f"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="M30.262,41.15	C31.584,39.943,32.5,38.246,32.5,36v-1.684c0.314,0.112,0.647,0.184,1,0.184c1.657,0,3-1.343,3-3s-1.343-3-3-3	c-0.353,0-0.686,0.072-1,0.184V24c0-5.247-3.253-9.5-8.5-9.5c-4.786,0-7.913,3.539-8.426,8.143"
        ></Path>
        <Path
          fill="none"
          stroke="#18193f"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="M16.5,11.5l-5.737-0.82	c-0.643-0.092-1.201,0.444-1.136,1.089L10.5,20.5l-5.034,2.517c-0.521,0.261-0.71,0.909-0.41,1.409L7.5,28.5l-0.869,7.822	c-0.068,0.616,0.434,1.145,1.052,1.109l1.702-0.099"
        ></Path>
        <Path
          fill="none"
          stroke="#18193f"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="M39.174,37.364L41.5,37.5	l-1-9l2.484-4.969c0.272-0.544-0.001-1.203-0.578-1.396L37.5,20.5l0.873-8.73c0.065-0.646-0.494-1.181-1.136-1.089L31.5,11.5	l-6.818-6.363c-0.384-0.359-0.98-0.359-1.365,0l-2.494,2.328"
        ></Path>
        <Polyline
          fill="none"
          stroke="#18193f"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          points="20.66,23.596 24.002,24.191 27.128,23.596"
        ></Polyline>
        <Line
          x1="22.043"
          x2="25.957"
          y1="36.872"
          y2="36.872"
          fill="none"
          stroke="#18193f"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        ></Line>
      </Svg>
      <Text style={styles.title}>Rick and Morty Character Explorer</Text>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("CharacterList", { category: "All" })
          }
        >
          <Text style={styles.cardTitle}>All Characters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("CharacterList", { category: "Alive" })
          }
        >
          <Text style={styles.cardTitle}>Alive Characters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("CharacterList", { category: "Dead" })
          }
        >
          <Text style={styles.cardTitle}>Dead Characters</Text>
        </TouchableOpacity>
      </View>
      {cards.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.cards}
          onPress={() =>
            navigation.navigate("CharacterDetail", { character: item })
          }
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.status}>{item.status}</Text>
          <Text style={styles.species}>{item.species}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cards: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  species: {
    fontSize: 16,
    color: "#666",
  },
});

export default Home;
