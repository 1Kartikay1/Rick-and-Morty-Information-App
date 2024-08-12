import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const getSeasonAndEpisode = (episodeNumber) => {
  const season = Math.floor((episodeNumber - 1) / 10) + 1;
  const episode = ((episodeNumber - 1) % 10) + 1;
  return { season, episode };
};

const CharacterDetail = ({ route }) => {
  const { character } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: character.image }} style={styles.characterImage} />
      <View style={styles.highlightBox}>
        <Text style={styles.characterName}>{character.name}</Text>
        <Text style={styles.characterDetails}>Status: {character.status}</Text>
        <Text style={styles.characterDetails}>
          Species: {character.species}
        </Text>
        <Text style={styles.characterDetails}>Gender: {character.gender}</Text>
        <Text style={styles.characterDetails}>
          Origin: {character.origin.name}
        </Text>
        <Text style={styles.characterDetails}>Episodes:</Text>
        {character.episode.map((episodeUrl, index) => {
          const episodeNumber = parseInt(episodeUrl.split("/").pop(), 10);
          const { season, episode } = getSeasonAndEpisode(episodeNumber);
          return (
            <Text key={index} style={styles.episode}>
              Season {season}, Episode {episode}
            </Text>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 1,
    alignItems: "center",
    paddingBottom: 16,
    paddingTop: 16,
    backgroundColor: "#f0f0f0",
  },
  highlightBox: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  characterImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
  characterName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  characterDetails: {
    fontSize: 18,
    marginBottom: 4,
  },
  episode: {
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
  },
});

export default CharacterDetail;
