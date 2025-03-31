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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "@/components/Icon";
import { theme } from "@/theme";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

interface EpisodeResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Episode[];
}

const FAVORITES_STORAGE_KEY = "@rick-morty:episodeFavorites";

export function EpisodesScreen() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState("all");

  async function loadEpisodes(pageNumber: number = 1) {
    try {
      setLoading(true);
      const response = await api.get<EpisodeResponse>(
        `/episode?page=${pageNumber}`
      );
      if (response.status === 200) {
        // Usei um set para garantir IDs únicos, pois eu estava tendo problemas de duplicação de IDS 
        if (pageNumber === 1) {
          setEpisodes(response.data.results);
        } else {
          // Append para páginas subsequentes para evitar as que estavam vindo duplicatas
          const uniqueEpisodes = [...episodes];
          const existingIds = new Set(uniqueEpisodes.map(ep => ep.id));
          
          response.data.results.forEach(newEpisode => {
            if (!existingIds.has(newEpisode.id)) {
              uniqueEpisodes.push(newEpisode);
            }
          });
          
          setEpisodes(uniqueEpisodes);
        }
        
        setHasNextPage(response.data.info.next !== null);
      } else {
        console.error("Error para carregar os episodios:", response.status);
      }
    } catch (error) {
      console.error("Error para carregar os episodios:", error);
    } finally {
      setLoading(false);
    }
  }

  async function loadFavorites() {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Erro para carregar os seus episódios favoritos:", error);
    }
  }

  async function toggleFavorite(episodeId: number) {
    try {
      let newFavorites;
      if (favorites.includes(episodeId)) {
        newFavorites = favorites.filter((id) => id !== episodeId);
      } else {
        newFavorites = [...favorites, episodeId];
      }
      setFavorites(newFavorites);
      await AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(newFavorites)
      );
    } catch (error) {
      console.error("Erro para atualizar os seus episódios favoritos:", error);
    }
  }

  function handleLoadMore() {
    if (hasNextPage && !loading && !showFavorites) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadEpisodes(nextPage);
    }
  }

  useEffect(() => {
    loadEpisodes(1);
    loadFavorites();
  }, []);

  useEffect(() => {
    if (showFavorites) {
      setPage(1);
    }
  }, [showFavorites]);

  function renderItem({ item }: { item: Episode }) {
    const isFavorite = favorites.includes(item.id);

    return (
      <S.Card>
        <S.EpisodeTitle>{item.name}</S.EpisodeTitle>
        <S.EpisodeDetails>
          <S.EpisodeText>{item.episode}</S.EpisodeText>
          <S.EpisodeText>{item.air_date}</S.EpisodeText>
          <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
            <Icon
              name="heart"
              size={24}
              color={isFavorite ? "main" : "gray1"}
            />
          </TouchableOpacity>
        </S.EpisodeDetails>
      </S.Card>
    );
  }

  const displayedEpisodes = episodes.filter((episode) => {
    const seasonNumber = episode.episode.split("E")[0].replace("S", "");
    return (
      (selectedSeason === "all" || seasonNumber === selectedSeason) &&
      (!showFavorites || favorites.includes(episode.id))
    );
  });

  const uniqueDisplayedEpisodes = Array.from(
    new Map(displayedEpisodes.map(item => [item.id, item])).values()
  );

  return (
    <S.Container>
      <S.Header>
        <Image source={require("../../assets/logo.png")} />
      </S.Header>

      <S.ContainerFilter>
        <TouchableOpacity onPress={() => setShowFavorites(!showFavorites)}>
          <S.FilterButton>
            <S.FilterButtonText>
              {showFavorites ? "Mostrar Todos" : "Mostrar Favoritos"}
            </S.FilterButtonText>
          </S.FilterButton>
        </TouchableOpacity>
      </S.ContainerFilter>

      {loading && uniqueDisplayedEpisodes.length === 0 ? (
        <S.Loader size="large" color={theme.colors.blue} />
      ) : uniqueDisplayedEpisodes.length === 0 && showFavorites ? (
        <S.EmptyContainer>
          <Icon name="heart" size={60} color="main" />
          <S.EmptyText>Nenhum episódio favorito</S.EmptyText>
          <S.EmptyDescription>
            Adicione seus episódios favoritos para vê-los aqui!
          </S.EmptyDescription>
        </S.EmptyContainer>
      ) : (
        <FlatList
          data={uniqueDisplayedEpisodes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
          onEndReached={showFavorites ? null : handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            loading && !showFavorites ? (
              <ActivityIndicator size="small" color={theme.colors.blue} />
            ) : null
          }
        />
      )}
    </S.Container>
  );
}