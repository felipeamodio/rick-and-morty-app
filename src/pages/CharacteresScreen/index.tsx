import { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as S from "./styles";
import { api } from "@/services/api";
import { theme } from "@/theme";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Icon } from "@/components/Icon";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

interface CharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

const FAVORITES_STORAGE_KEY = "@rick-morty:favorites";

export function CharacteresScreen() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  async function loadCharacters(pageNumber: number = 1) {
    try {
      setLoading(true);
      const response = await api.get<CharacterResponse>(
        `/character?page=${pageNumber}`
      );

      if (pageNumber === 1) {
        setCharacters(response.data.results);
      } else {
        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...response.data.results,
        ]);
      }

      setHasNextPage(response.data.info.next !== null);
    } catch (error) {
      console.error("Error loading characters:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleLoadMore() {
    if (hasNextPage && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadCharacters(nextPage);
    }
  }

  useEffect(() => {
    loadCharacters();
  }, []);

  function getStatusColor(status: string) {
    switch (status.toLowerCase()) {
      case "alive":
        return theme.colors.success;
      case "dead":
        return theme.colors.error;
      default:
        return theme.colors.green;
    }
  }

  async function loadFavorites() {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  }

  async function toggleFavorite(characterId: number) {
    try {
      let newFavorites;
      
      if (favorites.includes(characterId)) {
        newFavorites = favorites.filter(id => id !== characterId);
      } else {
        newFavorites = [...favorites, characterId];
      }
      
      setFavorites(newFavorites);
      
      await AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(newFavorites)
      );
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  }

  function renderItem({ item }: { item: Character }) {
    const isFavorite = favorites.includes(item.id);
    return (
      <S.Card
        style={{
          elevation: 3,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          shadowOffset: { 
            width: 0, 
            height: 2 
        },
        }}
      >
        <S.ImageCharater source={{ uri: item.image }} />
        <S.Info>

           <S.NameContainer>
            <S.Name>{item.name}</S.Name>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
              <Icon 
                name="heart" 
                size={24} 
                color={isFavorite ? "main" : "gray1"} 
              />
            </TouchableOpacity>
          </S.NameContainer>
          <S.Details>
            <S.StatusContainer>
              <View
                style={{
                  backgroundColor: getStatusColor(item.status),
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginRight: 6,
                }}
              />
              <S.StatusText>{item.status}</S.StatusText>
            </S.StatusContainer>
            <S.SpeciesText>{item.species}</S.SpeciesText>
          </S.Details>
          <S.GenderText>Gender: {item.gender}</S.GenderText>
        </S.Info>
      </S.Card>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <Image
          source={require("../../assets/logo.png")}
        />
      </S.Header>

      {loading && characters.length === 0 ? (
        <S.Loader size="large" color={theme.colors.blue} />
      ) : (
        <FlatList
          data={characters}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            loading ? <ActivityIndicator size="small" color={theme.colors.blue} /> : null
          }
        />
      )}
    </S.Container>
  );
}
