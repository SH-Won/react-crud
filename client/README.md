# CRUD 게시판
이미지를 첨부 한 게시글을 업로드,공유 하고 다른 사람이 올린 게시글을 볼 수 있는 게시판  
+ ### 프로젝트의 목적
> 클론코딩으로 배운 것을 바탕으로, 데이터를 요청하는 프론트엔드, 데이터를 저장,수정하는 벡엔드를 구성하여
> CRUD 가 어떻게 이루어지는지 전반적으로 이해를 하기 위해 프로젝트를 수행
+ ### 사용법
> + 루트 폴더, client 각 폴더 에서 npm install 을 통해 dependencies 를 설치하세요
> + server 하위 폴더 config 폴더에 dev.js 를 생성하고 자신의 MongoDB 를 넣으세요.

## 프로젝트 기능
① 회원가입 로그인 기능  
> JWT 을 이용하여 토큰부여, MongoDB에 회원정보 저장  

② 다중 이미지 파일 업로드 기능  
> multer 를 이용하여 jpg,png,gif 이미지 파일 다중으로 업로드  
> cloudinary 저장소를 이용하여 업로드된 원본 이미지를 저장  
> MongoDB에 이미지 url 저장   

③ 게시글 수정,삭제  
> 프론트엔드 에서 게시글을 수정,삭제 하면 백엔드에서 처리하여, 수정된 데이터는 MongoDB의 본 데이터를 수정, 삭제하면 MongoDB의 데이터를 삭제  

④ 게시물 분류,검색 기능  
> 게시글 분류 버튼과, 검색어를 입력시 Axios 이용해 데이터를 요청하고, 프론트엔드에서 요청받은 데이터를 처리하여 렌더링  

⑤ 댓글 대댓글 기능  
> 프론트 엔드에서 Post 요청을 통해 댓글정보를 MongoDB에 저장  
> Post 요청시 상위댓글과 하위댓글을 분류하기 위해 하위댓글 이라면, 댓글 객체에 ResponseTo 프로퍼티에 상위댓글의 id 를 같이 저장
> 프론트엔드에서 모든 댓글을 요청하고, 댓글의 id와 responseTo를 비교하여, 상위댓글과 하위댓글을 각각 분류  

⑥ 좋아요 싫어요 기능  
⑦ 좋아요 싫어요 확인페이지  
⑧ 최근 본 게시물 확인 기능  

## 프로젝트 수행후 느낀점
+ Redux  
> React는 상위 컴포넌트(Container)에서 하위컴포넌트로 props를 통해 값을 전달 할수 있는데, 컴포넌트의 구조가 복잡하지 않다면, props를 통해 
> 충분히 값을 전달 할 수 있고, 매우 직관적이다.  
> Redux는 상태관리 라이브러리이다. Store에 모든 데이터가 있으며, 어떤 컴포넌트에서 데이터가 필요하면 Store에서 데이터를 가져오면 된다.  
> 만약 props로 값을 전달 할 수 있는 얕은 컴포넌트 구조인데, Redux를 쓴다면, 매우 비효율적이라고 느꼈다.  
> 두 컴포넌트에서 같은 데이터를 필요로 하고, 컴포넌트의 구조가 props로 전달하기가 매우 까다로운 구조라면, Redux를 사용하는 것은 매우 효율적이나
> 구조가 깊지 않고, 직선적이라면, Props를 사용하는게 더 효율적인것 같다.  
+ Axios (비동기)
> Axios를 이용하여 데이터를 요청하면 프로미스 객체를 반환한다. 프로미스 객체는 resolve 와 reject를 가지고 있는데, then 메소드 체이닝으로 원할때
> 후속 처리를 할 수 있다.  
> 자바스크립트는 함수가 호출되면 콜 스택(Call Stack) 에 올려져 함수 안의 코드를 실행한다. 만약 여러개의 함수가 호출 되고, 그 중간에 통신을 위한
> 함수가 호출되는데 통신이 10초가 걸린다면, 통신을 위한 함수가 콜 스택(Call Stack)에서 제거 되기 전까지 뒤에 있는 함수는 실행이 안되는 걸까? 라는 생각이 들었다.  
> 비동기 함수가 호출 되면 콜 스택(Call Stack)에 올려지고, 백그라운드 로 보내진다. 백그라운드에서 처리된 후 콜백 함수가 태스크 큐(Task Queue)로
> 이동 된다. 그 사이에 나머지 함수들이 콜 스택(Call Stack)에 올려지고 실행되고, 비로소 콜 스택(Call Stack)이 비워진 것을 이벤트루프(Event Loop)
> 가 확인을 하면, 비동기함수의 콜백함수가 태스크 큐(Task Queue)에서 이벤트 루프에 의해 콜 스택(Call Stack) 으로 올려지고 실행되게 된다.  
> 비동기에 대해서 조금 더 알아 볼 수 있었다.  

## 화면
+ 로그인 화면  

![로그인화면](https://res.cloudinary.com/dhjegsbqv/image/upload/v1622127099/CRUD/login_eabxmm.gif "로그인 화면")  


+ 홈 화면  

![홈 화면](https://res.cloudinary.com/dhjegsbqv/image/upload/v1622127125/CRUD/landing_pvfdik.gif "홈 화면")  
  
  
+ 카테고리  

![카테고리](https://res.cloudinary.com/dhjegsbqv/image/upload/v1622127099/CRUD/category_s768ne.gif "카테고리")  
  
  
+ 검색  

![검색](https://res.cloudinary.com/dhjegsbqv/image/upload/v1622127101/CRUD/search_d7d914.gif "검색")  
  
  
+ 디테일 화면  

![디테일 화면](https://res.cloudinary.com/dhjegsbqv/image/upload/v1622127098/CRUD/detailpage_eraxnb.gif "디테일 화면")  
  
  
+ 댓글  

![댓글](https://res.cloudinary.com/dhjegsbqv/image/upload/v1622127114/CRUD/comment_rtli7g.gif "댓글")  
  
  
+ 좋아요  

![좋아요](https://res.cloudinary.com/dhjegsbqv/image/upload/v1622127100/CRUD/like_coqxmc.gif "좋아요")  
  
  
+ 좋아요 삭제  

![좋아요 삭제](https://res.cloudinary.com/dhjegsbqv/image/upload/v1622127130/CRUD/dislike_n0sfno.gif "좋아요 삭제")  













이 프로젝트는 CRA 를 이용해서 만들었습니다. [Create React App](https://github.com/facebook/create-react-app).
