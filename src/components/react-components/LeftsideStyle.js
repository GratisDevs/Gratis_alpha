import styled from 'styled-components';

const style={};

style.Container = styled.div`
  
`;

style.ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 5px 3px #bbb;
`;

style.UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
`;

style.CardBackground = styled.div`
  background: url("/images/card-bg.svg");
  background-position: center;
  background-size: 460px;
  height: 70px;
  margin: -10px -10px 0;
`;

style.Photo = styled.div`
  box-shadow: none;
  background-image: url(${props=>props.url});
  width: 72px;
  height: 72px;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: white;
  background-position: left;
  background-size: 100%;
  background-repeat: no-repeat;
  border: 2px solid white;
  margin: -38px auto 5px 12px;
  border-radius: 50%;
`;

style.Link = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;

style.AddPhotoText = styled.label`
  color: #0a66c2;
  margin-top: 4px;
  font-size: 16px;
  line-height: 1.33;
  font-weight: 400;
`;

style.Widget = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 12px;
  padding-bottom: 12px;
  & > a {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    div {
      display: flex;
      flex-direction: column;
      text-align: left;
      span {
        font-size: 16px;
        line-height: 1.333;
        &:first-child {
          color: rgba(0, 0, 0, 0.6);
        }
        &:nth-child(2) {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }
  svg {
    color: rgba(0, 0, 0, 1);
  }
`;

style.Item = styled.a`
  border-color: rgba(0, 0, 0, 0.8);
  text-align: left;
  padding: 12px;
  font-size: 16px;
  display: block;
  span {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 1);
    svg {
      color: rgba(0, 0, 0, 0.6);
    }
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

style.CommunityCard = styled(style.ArtCard)`
  padding: 8px 0 0;
  box-shadow: 0 0 5px 3px #bbb;
`;

export default style;