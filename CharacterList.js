import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const CharacterList = ({ route, navigation }) => {
  const { category } = route.params;
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      let url = "https://rickandmortyapi.com/api/character";
      const params = [];
      if (category !== "All") {
        params.push(`status=${category}`);
      }
      if (statusFilter) {
        params.push(`status=${statusFilter}`);
      }
      if (speciesFilter) {
        params.push(`species=${speciesFilter}`);
      }
      if (genderFilter) {
        params.push(`gender=${genderFilter}`);
      }
      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setCharacters(data.results);
      setLoading(false);
    };
    fetchCharacters();
  }, [category, statusFilter, speciesFilter, genderFilter]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <Picker
          selectedValue={speciesFilter}
          onValueChange={(itemValue) => setSpeciesFilter(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All Species" value="" />
          <Picker.Item label="Human" value="Human" />
          <Picker.Item label="Alien" value="Alien" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
        <Picker
          selectedValue={genderFilter}
          onValueChange={(itemValue) => setGenderFilter(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All Genders" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Genderless" value="Genderless" />
          <Picker.Item label="Unknown" value="unknown" />
        </Picker>
      </View>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.characterCard}
            onPress={() =>
              navigation.navigate("CharacterDetail", { character: item })
            }
          >
            <Image source={{ uri: item.image }} style={styles.characterImage} />
            <View style={styles.characterInfo}>
              <Text style={styles.characterName}>{item.name}</Text>
              <Text style={styles.characterDetails}>{item.species}</Text>
              <Text style={styles.characterStatus}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  picker: {
    flex: 1,
    height: 50,
    marginHorizontal: 8,
  },
  characterCard: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  characterInfo: {
    marginLeft: 16,
    justifyContent: "center",
  },
  characterName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  characterDetails: {
    fontSize: 14,
    color: "#666",
  },
  characterStatus: {
    fontSize: 14,
    color: "#666",
  },
});

export default CharacterList;
