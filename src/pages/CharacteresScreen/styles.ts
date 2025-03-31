import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: "#f2f2f2";
`;

export const Header = styled.View`
  padding-top: 60px;
  padding-bottom: 20px;
  background-color: #2C3E50;
  align-items: center;
  justify-content: center;
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
  color: #666666;
`;

export const SpeciesText = styled.Text`
  font-size: 14px;
  color: #666666;
`;

export const GenderText = styled.Text`
  font-size: 14px;
  color: #666666;
`;

export const Loader = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
