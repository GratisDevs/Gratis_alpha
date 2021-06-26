import styled from 'styled-components';

const style={};

style.CommonCard=styled.div`
text-align: center;
overflow: hidden;
margin-bottom: 15px;
background-color: #fff;
border-radius: 5px;
transition: box-shadow 83ms;
position: relative;
border: none;
box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

style.ShareBox=styled.div`
display: flex;
flex-direction: column;
color: #958b7b;
margin: 0 0 8px;
background: white;
box-shadow: 0 0 5px 3px #bbb;
div{
    img{
        width: 20px;
        margin-right: 3px;
    }
    button{
        outline: none;
        color: rgba(0, 0, 0, 0.6);
        font-size: 14px;
        line-height: 1.5;
        min-height: 40px;
        background: transparent;
        border: none;
        align-items: center;
        font-weight: 600;
    }
    &:nth-child(2){
        display: flex;
        align-items: center;
        padding: 8px 16px 0px 16px;
        img{
            width: 45px;
            border-radius: 50%;
            margin-right: 8px;
        }
        button{
            margin: 4px 0;
            flex-grow: 1;
            border-radius: 35px;
            padding-left: 16px;
            border: 1px solid rgba(0,0,0,0.15);
            background-color: white;
            text-align: left;
        }
    }
    &:nth-child(3){
        display: flex;
        justify-content: space-around;
        padding-bottom: 4px;
    }
}
`;

style.Article=styled(style.CommonCard)`
    padding; 0px;
    margin: 0 0 8px;
    box-shadow: 0 0 5px 3px #bbb;
    overflow: visible;
`;

style.SharedActor=styled.div`
    padding-right: 40px;
    flex-wrap: nowrap;
    padding: 12px 16px 0;
    margin-bottom: 8px;
    align-items: center;
    display: flex;
    a{
        margin-right: 12px;
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        text-decoration: none;
        img{
            width: 45px;
            height: 45px;
            border-radius: 50%;

        }
        &>div{
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-basis: 0;
            margin-left: 8px;
            overflow: hidden;
            span{
                text-align: left;
                &:first-child{
                    font-size: 14px;
                    font-weight: 700;
                    color: rgba(0,0,0,1);
                }
                &:nth-child(n+1){
                    font-size: 12px;
                    color: rgba(0,0,0,0.6);
                }
            }
        }
    }
    button{
        position; absolute;
        right: 2px;
        top: 0;
        background: transparent;
        border: none;
        outline: none;
    }
`;

style.Description=styled.div`
    padding: 0 16px;
    oveflow: hidden;
    color: rgba(0,0,0,0.9);
    font-size: 14px;
    text-align: left;
`;

style.SharedImage=styled.div`
    margin-top: 8px;
    img{
        width: 100%;
        height: 100%;
        padding: 0 8px;
    }
`;

style.SocialCount=styled.ul`
    line-height: 1.3;
    display: flex;
    align-items: flex-start;
    overflow: auto;
    margin: 0 16px;
    padding: 8px 0;
    border-bottom: 1px solid #e9e5df;
    list-style: none;
    li{
        margin-right: 5px;
        font-size: 12px;
        button{
            outline: none;
            border: none;
            background-color: transparent;
            img{
                width: 20px;
                margin: 2px;
            }
        }
        a{
            font-size: 15px;
            font-weight: 600;
            position: absolute;
            right: 10px;
        }
    }
`;

style.SocialActions=styled.div`
    align-items: center;
    display: flex;
    justify-content: space-around;
    margin: 0;
    min-height: 40px;
    padding: 4px 8px;
    button{
        display: inline-flex;
        align-items: center;
        padding; 8px;
        color: #0a66c2;
        outline; none;
        border: none;
        background-color: transparent;
        @media(min-width: 768px){
            span{
                margin-left: 8px;
            }
        }
        img{
            width: 15px;
        }
        span{
            font-size: 12px;
        }
    }
`;

export default style;