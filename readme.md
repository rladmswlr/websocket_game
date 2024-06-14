# 웹소켓 게임 만들기
## 게임 장르 :  러닝 플래포머 게임, (구글의 다이노런 활용)
![image](https://github.com/rladmswlr/websocket_game/assets/37393922/e13152e3-7138-4d20-b37e-ca8a5fc12e92)
## 제작 기간 : 2024 6/10일 ~ 6/14일

## 구현된 기능
- [x]  시간에 따른 점수 획득
    - [x]  스테이지 구분
           - 점수에 따라 Stage가 구분하게 구현하였다. </p>
           ![image](https://github.com/rladmswlr/websocket_game/assets/37393922/9b503c96-e7ae-404f-aecd-0cc46ae1d36e)
           다음과 같은 스테이지의 데이터를 담은 Json 파일을 제작하였고, 해당하는 score에 맞게 score가 바뀌었다면, stage가 바뀌는 것을 구현하였다. </p>
           스테이지가 바뀔시 서버로 정보를 보내서 스테이지에 맞게 들어갔는지, 다음 스테이지 정보가 존재하는지, 아이템 해금 정보가 잘 진행되었는지, 서버의 정보와 유저가 전달한 정보가 일치하는지를 확인한다.</p>
           </p>
    - [x]  스테이지에 따른 점수 획득 구분
           스테이지에 따라서 점수가 다르게 구분하였다. 위의 스테이지 구분에 나오는 Json파일을 활용해서 해당 stage에 들어갔을 때 얻는 점수가 다르게 적용하는 코드를 작성하였다. </p>
           스테이지에 따라 1스테이지는 1배의 점수, 2스테이지는 2배, 3스테이지는 3배와 같은 점수를 획득하게 진행하였고, 이 코드 또한 스테이지가 옮겨가는 쪽에서 서버로 잘 옮겨졌는지 확인한 후 stage를 옮겨주었다.</p>
</p> 
- [x]  아이템 획득
    - [x]  아이템 획득 시 점수 획득 </p>
           - 아이템 획득 할 때 점수가 나오는 코드를 구현하였다. </p>
           아이템을 획득하는 직접적인 코드가 있는 getItem(itemcode)를 기반으로 코드를 작성하였는데, item.json 파일을 어제 배운 방법을 통해 import해서 가져와 점수를 아이템의 스코어만큼 score를 더해준다.</p>
    </p>
    - [x]  스테이지 별 아이템 생성 구분 </p>
           - 아이템을 가져온 json파일을 기반으로 입력받은 itemid를 기반으로 find함수를 이용하여서 item 값을 찾아준다.</p>
           그리고 해당하는 item의 score값을 기본 점수에 더해줘서 itemid를 기반으로 다른 점수를 구현해준다.</p>
           ![image](https://github.com/rladmswlr/websocket_game/assets/37393922/63d9eb63-9c69-414a-bd97-c430b1fb647d)
    </p>
    - [x]  아이템 별 획득 점수 구분
           - itemController가 아이템을 그려주기 때문에, 이 부분에서 createitem함수를 이용하여서 스테이지별로 아이템을 다르게 구현하게끔 하였다.</p>
           우선 item_unlock의 json파일을 가져오고, 현재 해당하는 nowStage부분을 score에서 전달한 값을 index.js에서 update문을 통해서 현재 stage값을 가져오고 해당하는 stage값을 기반으로 item_id를 해금 해준다.</p>
           그리고 item_id 값을 랜덤으로 구해주면된다.</p>
           ![image](https://github.com/rladmswlr/websocket_game/assets/37393922/e2ac804d-a11f-4c8b-bc2a-6691753ef04b)
           다음과 같이 item_id를 가져오고 item_id - 1 만큼 하면 </p>
           ![image](https://github.com/rladmswlr/websocket_game/assets/37393922/5fffc616-9dc4-4fc7-94e2-becfc8b0ab9c)
           다음과 같은 결과 처럼 item_id 가 해금이 1번까지 되었을 경우 (0 ,1 ) 부터 (0 ~6)까지 랜덤으로 나오게 하였다.</p>
   </p>
   -  [x]  클라이언트와 서버요청 나눠서 구현
           - 제일 중요한 부분이다. 우선 우리가 서버에서 전달받아야 하는 부분이 아이템을 먹었을 때 아이템을 잘 먹었는가 그 아이템의 점수가 맞게끔 먹었나, </p>
           아이템 해금조건에 맞게끔 올바른 스테이지에서 아이템을 먹었나를 체크해볼 수 있고, 해당 데이터를 저장해야한다. </p>
           stage 데이터를 저장하기 위해서 스테이지를 이동하는 stage.handler.js를 이용해서 stage을 이동할 때 unlock 데이터도 함께 저장하게 끔 하였다.</p>
           그리고 item의 데이터를 저장하기 위한 model을 제작하였다.</p>
           ![image](https://github.com/rladmswlr/websocket_game/assets/37393922/7477560e-e597-4f44-8cfb-3ddb2c6be863)
