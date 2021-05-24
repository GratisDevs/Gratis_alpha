import styled from 'styled-components';

const style={};

style.ShareCreation=styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 10px 20px 10px 16px;
`;

style.AssetButton=styled.button`
    align-items: center;
    background-color: transparent;
    outline: none;
    border: none;
    height: 40px;
    min-width: auto;
    color: rgba(0,0,0,0.5);
    img{
        width: 30px;
    }
`;

style.AttachAssets=styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-right; 8px;
    $(AssetButton){
        width: 40px;
    }
`;

style.ShareComment=styled.div`
    margin-left: 10px;
    padding-left: 8px;
    margin-right: auto;
    border-left: 1px solid rgba(0,0,0,0.25);
    $(AssetButton){
        svg{
            margin-right: 5px;
        }
    }
`;

style.UploadImage=styled.div`
    text-align: center;
    img{
        width: 100%;
        margin-top: 5px;
    }
`;

export default style;