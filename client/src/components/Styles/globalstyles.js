import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  //global***************************************

  body {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.neutral};
    border-color: ${({ theme }) => theme.secondary}
    transition: all 0.50s linear;
  }

  //HomeFeed*************************************

  .home-title{
  color: ${({ theme }) => theme.neutral};
  }
  .main-post-container{
    border-color: ${({ theme }) => theme.secondary}
    background-color: ${({ theme }) => theme.tertiary}
    color: ${({ theme }) => theme.neutral};
  }
  .post-show{
    color: ${({ theme }) => theme.neutral};
  }
  .post-show:hover{
    color: ${({ theme }) => theme.quaternary};
   }
   .post-author{
    color: ${({ theme }) => theme.tertiary};
   }
   #post-content{
    color: ${({ theme }) => theme.neutral};
   }
   .post-like-btn{
    color: ${({ theme }) => theme.quaternary};
  }
  .liked-button{
    color: ${({ theme }) => theme.tertiary};
  }
  .comment-btn{
    color: ${({ theme }) => theme.quaternary};
  }
  .post-comment-btn{
    color: ${({ theme }) => theme.tertiary};
  }
  .comment-txt-box{
    background-color: ${({ theme }) => theme.tertiary};
    color: ${({ theme }) => theme.neutral};
    border-color: ${({ theme }) => theme.neutral};
  }
  .submit-post-comment-btn{
    background-color: ${({ theme }) => theme.secondary};
    border-color: ${({ theme }) => theme.neutral};
    color: ${({ theme }) => theme.neutral};
  }
  .comment {
    border-color: ${({ theme }) => theme.neutral};
    color: ${({ theme }) => theme.neutral};
   }
   .comment-author{
    color: ${({ theme }) => theme.tertiary};
   }
   #comment-content{
    color: ${({ theme }) => theme.neutral};
   }
   .reply-comment-txt-box{
    color: ${({ theme }) => theme.neutral};
    border-color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.tertiary};
  }
  .submit-reply-comment-btn{
    background-color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.neutral};
    color: ${({ theme }) => theme.neutral};
  }
  .x-btn{
    color: ${({ theme }) => theme.neutral};
  }
  .x-btn:hover{
    color: ${({ theme }) => theme.tertiary};
  }


  //app***********************************

  .navbar{
    color:${({ theme }) => theme.tertiary};
  }
  .navbutton:hover{
    color:${({ theme }) => theme.neutral};
  }
  .search {
    background-color: ${({ theme }) => theme.primary};
  }
  .search-term {
    border: ${({ theme }) => theme.quaternary}
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.ternary}
  }
  
  .search-term:focus{
    color:${({ theme }) => theme.primary};
  }
  
  .srch-button {
    border:${({ theme }) => theme.secondary};
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};

  }
`;
