import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  //global***************************************

  body {
    transition: all 1.0s linear;
    background-image: url(${({ theme }) => theme.image});
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: ${({ theme }) => theme.neutral};
    border-color: ${({ theme }) => theme.secondary};    
  }

  //HomeFeed*************************************

  @keyframes classicToMovie {
    from {margin-top: 0px;}
    to {margin-top: 500px;}
  }
  @keyframes movieToClassic {
    from {margin-top: 500px;}
    to {margin-top: 0px;}
  }

  .home-title{
    color: ${({ theme }) => !theme.classic ? 'rgba(0, 0, 0, 0)' : theme.neutral};
    animation-name: ${({ theme }) => !theme.classic ? 'classicToMovie' : 'movieToClassic'};
    margin-top: ${({ theme }) => !theme.classic ? '500px' : '0px'};

    animation-duration: 1s;
  }
  .main-post-container{
    backdrop-filter: blur(10px) saturate(40%);
    background-color: ${({ theme }) => theme.classic ? 
    theme.primary : 
    theme.opaque};
    border-color: ${({ theme }) => theme.neutral};
    max-width: 500px;

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
    background-color: ${({ theme }) => 'rgba(0, 0, 0, 0.2)'};
    color: ${({ theme }) => theme.neutral};
    border-color: ${({ theme }) => theme.neutral};
  }
  .submit-post-comment-btn{
    background-color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.neutral};
    color: ${({ theme }) => theme.neutral};
  }
  .comment {
    backdrop-filter: blur(20px) saturate(40%);
    background-color: ${({ theme }) => theme.classic ? 
    theme.primary : 
    theme.opaque};
    border-color: ${({ theme }) => theme.neutral};
    color: ${({ theme }) => theme.neutral};
    max-width: 500px;
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
    background-color: ${({ theme }) => 'rgba(0, 0, 0, 0.2)'};
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
    color: ${({ theme }) => theme.quinary};
  }


  //app***********************************

  .navbar{
    color:${({ theme }) => theme.neutral};
    border-color: ${({ theme }) => theme.neutral};
    backdrop-filter: blur(10px) saturate(40%);
    background-color: ${({ theme }) => theme.classic ? 
    theme.primary : 
    theme.opaque};
  }
  .navbutton:hover{
    color:${({ theme }) => theme.quinary};
  }
  .search {
  }
  .search-term {
    border: ${({ theme }) => theme.neutral};
    // background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.tertiary};
  }
  
  .search-term:focus{
    color:${({ theme }) => theme.primary};
  }
  
  .srch-button {
    // display: none;
    border:${({ theme }) => theme.secondary};
    background: ${({ theme }) => theme.neutral};
    color: ${({ theme }) => theme.primary};
  }

  //MovieMode*************************
  .dropbtn {
    background-clip: padding-box;
    backdrop-filter: blur(20px) saturate(40%);
    background-color: ${({ theme }) => theme.classic ? 
    theme.primary : 
    theme.opaque};
    border-width: 2.4px;
    border-color: ${({ theme }) => theme.neutral};
    color: ${({ theme }) => theme.neutral};

  }
  .dropdown-content a:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.quaternary};
  }
  .dropdown-content {
    overflow:hidden;
    backdrop-filter: blur(20px) saturate(40%);
    background-color: ${({ theme }) => theme.classic ? 
    theme.primary : 
    theme.opaque};
    border-width: 2.4px;
    border-color: ${({ theme }) => theme.neutral};
  }
  .dropdown-content a {
    color: ${({ theme }) => theme.neutral};
  }
  .dropdown:hover .dropbtn {
    color: ${({ theme }) => theme.tertiary};
  }

  //Posts*********
  #header {
    color: ${({ theme }) => theme.neutral};
  }

  #post-sub-header {
    color: ${({ theme }) => theme.neutral};
  }

  .create-post-form{
    background-color: ${({ theme }) => theme.classic ? theme.primary : theme.opaque};
    border-color: ${({ theme }) => theme.neutral};
    backdrop-filter: blur(10px) saturate(40%);
  }

  
.choose-show {
  color: ${({ theme }) => theme.neutral};
  background-color: ${({ theme }) => theme.classic ? theme.primary : theme.opaque};
  border-color: ${({ theme }) => theme.neutral};
  max-width: 180px;
}

.option-show:hover {
  background-color: ${({ theme }) => theme.primary};
}

.option-show {
  border-radius: 25px;
}

#post-title {
  background-color: rgba(0, 0, 0, 0);
  color: ${({ theme }) => theme.neutral};
}

#post-text {
  background-color: rgba(0, 0, 0, 0);
  color: ${({ theme }) => theme.neutral};
}

#submit-button {
  background-color: ${({ theme }) => theme.classic ? theme.neutral : theme.tertiary};
  color: ${({ theme }) => theme.classic ? theme.primary : theme.neutral};
}

#submit-button:hover {
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.neutral};
}

::placeholder{
  color: ${({ theme }) => theme.tertiary};
}

#error-message {
  color: ${({ theme }) => theme.secondary};
}

#pic {
  display: ${({ theme }) => !theme.classic && 'none'}
}
`;
