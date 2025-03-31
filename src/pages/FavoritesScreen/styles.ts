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

export const Title = styled.Text`
    font-size: 30px;
    font-weight: 700;
    padding: 10px;
`;

export const Card = styled.TouchableOpacity`
  flex-direction: row;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 16px;
  overflow: hidden;
`;

export const ImageCharater = styled.Image`
  width: 100px;
  height: 100px;
`;

export const Info = styled.View`
  flex: 1;
  padding: 12px;
  justify-content: center;
`;

export const NameContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

export const Name = styled.Text`
  font-size: 18px;
  font-weight: bold;
  flex: 1;
`;

export const Details = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

export const StatusContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
`;

export const StatusIndicator = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-right: 6px;
`;

export const StatusText = styled.Text`
  font-size: 14px;
  color: ${theme.colors.gray3};
`;

export const SpeciesText = styled.Text`
  font-size: 14px;
  color: ${theme.colors.gray3};
`;

export const GenderText = styled.Text`
  font-size: 14px;
  color: ${theme.colors.gray3};
`;

export const Loader = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  align-items: center;
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