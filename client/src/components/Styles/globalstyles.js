import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  //global***************************************

  body {
    background: ${({ theme }) => theme.primary};
    background-image: url(${({ theme }) => theme.image});
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: ${({ theme }) => theme.neutral};
    border-color: ${({ theme }) => theme.secondary}
    transition: all 0.50s linear;
  }

  //HomeFeed*************************************

  .home-title{
  color: ${({ theme }) => theme.neutral};
  margin-top: ${({ theme }) => !theme.classic && '400px'};
  }
  .main-post-container{
    backdrop-filter: blur(20px);
    border-color: ${({ theme }) => theme.neutral};
    color: ${({ theme }) => theme.neutral};
  }
  .post-show{
    color: ${({ theme }) => theme.neutral};
  }
  .post-show:hover{
    color: ${({ theme }) => theme.secondary};
   }
   .post-author{
    color: ${({ theme }) => theme.quaternary};
   }
   #post-content{
    color: ${({ theme }) => theme.neutral};
   }
   .post-like-btn{
    color: ${({ theme }) => theme.tertiary};
  }
  .liked-button{
    color: ${({ theme }) => theme.secondary};
  }
  .comment-btn{
    color: ${({ theme }) => theme.tertiary};
  }
  .post-comment-btn{
    color: ${({ theme }) => theme.tertiary};
  }
  .comment-txt-box{
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.neutral};
    border-color: ${({ theme }) => theme.neutral};
  }
  .submit-post-comment-btn{
    background-color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.neutral};
    color: ${({ theme }) => theme.neutral};
  }
  .comment {
    backdrop-filter: blur(20px);
    border-color: ${({ theme }) => theme.neutral};
    color: ${({ theme }) => theme.neutral};
   }
   .comment-author{
    color: ${({ theme }) => theme.quaternary};
   }
   #comment-content{
    color: ${({ theme }) => theme.neutral};
   }
   .reply-comment-txt-box{
    color: ${({ theme }) => theme.neutral};
    border-color: ${({ theme }) => theme.neutral};
    background-color: ${({ theme }) => theme.quinary};
  }
  .submit-reply-comment-btn{
    background-color: ${({ theme }) => theme.quinary};
    border-color: ${({ theme }) => theme.neutral};
    color: ${({ theme }) => theme.neutral};
  }
  .x-btn{
    color: ${({ theme }) => theme.neutral};
  }
  .x-btn:hover{
    color: ${({ theme }) => theme.secondary};
  }


  //app***********************************

  .navbar{
    color:${({ theme }) => theme.neutral};
    border-color: ${({ theme }) => theme.neutral};
    backdrop-filter: blur(20px);
  }
  .navbutton:hover{
    color:${({ theme }) => theme.quaternary};
  }
  .search {
  }
  .search-term {
    border: ${({ theme }) => theme.neutral};
    // background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.ternary};
  }
  
  .search-term:focus{
    color:${({ theme }) => theme.primary};
  }
  
  .srch-button {
    border:${({ theme }) => theme.secondary};
    background: ${({ theme }) => theme.neutral};
    color: ${({ theme }) => theme.primary};
  }

  //MovieMode*************************
  .dropbtn {
    backdrop-filter: blur(20px);
    border-width: 2.4px;
    border-color: ${({ theme }) => theme.neutral};
    color: ${({ theme }) => theme.neutral};

  }
  .dropdown-content a:hover {
    cursor: pointer;
    ${({ theme }) => theme.quaternary};
  }
  .dropdown-content a {
    color: ${({ theme }) => theme.neutral};
    backdrop-filter: blur(20px);
  }
  // .dropdown:hover .dropbtn {
  //   ${({ theme }) => theme.primary};
  // }
`;
