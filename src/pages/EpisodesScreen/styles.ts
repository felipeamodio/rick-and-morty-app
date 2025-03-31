import { theme } from "@/theme";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.gray2};
`;

export const Header = styled.View`
  padding-top: 60px;
  padding-bottom: 20px;
  background-color: ${theme.colors.greenWater};
  align-items: center;
  justify-content: center;
`;

export const Card = styled.View`
  background-color: white;
  border-radius: 10px;
  margin-bottom: 16px;
  padding: 12px;
`;

export const EpisodeTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const EpisodeDetails = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4px;
`;

export const EpisodeText = styled.Text`
  font-size: 14px;
  color: ${theme.colors.gray3};
`;

export const Loader = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const FilterButton = styled.View`
  background-color: ${theme.colors.main};
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

export const FilterButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

export const ContainerFilter = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const ButtonSelector = styled.View`
    border-radius: 5px;
    background-color: ${theme.colors.white};
    border-width: 1px;
    border-color: ${theme.colors.main};
    padding: 10px;
    margin-top: 10px;
`;

export const SelectorButtonText = styled.Text`
  color: ${theme.colors.main};
  font-weight: bold;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const EmptyText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 16px;
  color: ${theme.colors.greenWater};
`;

export const EmptyDescription = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-top: 8px;
  color: ${theme.colors.gray3};
`;