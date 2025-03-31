import { useState, useCallback } from "react";
import {
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import * as S from "./styles";
import { api } from "@/services/api";
import { theme } from "@/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "@/components/Icon";
import { useFocusEffect } from "@react-navigation/native";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

const FAVORITES_STORAGE_KEY = "@rick-morty:favorites";

export function FavoritesScreen() {
  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      
      if (storedFavorites) {
        const favoriteIds: number[] = JSON.parse(storedFavorites);
        setFavorites(favoriteIds);
        
        if (favoriteIds.length > 0) {
          const charactersPromises = favoriteIds.map(id => 
            api.get(`/character/${id}`)
          );
          
          const responses = await Promise.all(charactersPromises);
          const characters = responses.map(response => response.data);
          
          setFavoriteCharacters(characters);
        } else {
          setFavoriteCharacters([]);
        }
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  async function toggleFavorite(characterId: number) {
    try {
      const newFavorites = favorites.filter(id => id !== characterId);
      
      setFavorites(newFavorites);
      setFavoriteCharacters(prevCharacters => 
        prevCharacters.filter(character => character.id !== characterId)
      );
      
      await AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(newFavorites)
      );
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  }

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

  function renderItem({ item }: { item: Character }) {
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
                color="main" 
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

      <S.Title>Personagens favoritos</S.Title>

      {loading ? (
        <S.Loader size="large" color={theme.colors.blue} />
      ) : favoriteCharacters.length === 0 ? (
        <S.EmptyContainer>
          <Icon name="heart" size={60} color="main" />
          <S.EmptyText>Nenhum personagem favorito</S.EmptyText>
          <S.EmptyDescription>
            Adicione seus personagens favoritos para vê-los aqui!
          </S.EmptyDescription>
        </S.EmptyContainer>
      ) : (
        <FlatList
          data={favoriteCharacters}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </S.Container>
  );
}