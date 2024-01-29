import { ChatRoom } from "./ChatRoom.type";

interface ChatRoomData {
  [key: number]: ChatRoom[];
}

export const dummyChatRoom: ChatRoomData = {
  1: [
    {
      chatroom_id: 1,
      message_id: 1,
      sender_name: "홍길동",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "안녕하세요. 자기계발 독서 모임에 오신 것을 환영합니다!",
      send_time: "2024-01-25 14:35"
    },
    {
      chatroom_id: 1,
      message_id: 2,
      sender_name: "김철수",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "안녕하세요! 책 읽는 걸 좋아해서 가입했어요.",
      send_time: "2024-01-25 14:40"
    },
    {
      chatroom_id: 1,
      message_id: 3,
      sender_name: "이영희",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "저도 책 읽는 걸 좋아합니다. 함께 공부하면서 좋은 시간 보내요!",
      send_time: "2024-01-25 14:45"
    },
    {
      chatroom_id: 1,
      message_id: 4,
      sender_name: "박민수",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "어떤 책을 읽고 계신가요?",
      send_time: "2024-01-25 14:50"
    },
    {
      chatroom_id: 1,
      message_id: 5,
      sender_name: "이지훈",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "최근에 '책 이름'을 읽고 있는데 정말 좋아요!",
      send_time: "2024-01-25 14:55"
    },
    {
      chatroom_id: 1,
      message_id: 1,
      sender_name: "홍길동",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "안녕하세요. 자기계발 독서 모임에 오신 것을 환영합니다!",
      send_time: "2024-01-25 14:35"
    },
    {
      chatroom_id: 1,
      message_id: 2,
      sender_name: "김철수",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "안녕하세요! 책 읽는 걸 좋아해서 가입했어요.",
      send_time: "2024-01-25 14:40"
    },
    {
      chatroom_id: 1,
      message_id: 3,
      sender_name: "이영희",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "저도 책 읽는 걸 좋아합니다. 함께 공부하면서 좋은 시간 보내요!",
      send_time: "2024-01-25 14:45"
    },
    {
      chatroom_id: 1,
      message_id: 4,
      sender_name: "박민수",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "어떤 책을 읽고 계신가요?",
      send_time: "2024-01-25 14:50"
    },
    {
      chatroom_id: 1,
      message_id: 5,
      sender_name: "이지훈",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "최근에 '책 이름'을 읽고 있는데 정말 좋아요!",
      send_time: "2024-01-25 14:55"
    }
  ],
  2: [
    {
      chatroom_id: 2,
      message_id: 1,
      sender_name: "김현우",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "오늘 스터디 모임 시간 어떻게 되나요?",
      send_time: "2024-01-25 19:00"
    },
    {
      chatroom_id: 2,
      message_id: 2,
      sender_name: "이수진",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "오후 7시에 시작할까요?",
      send_time: "2024-01-25 19:05"
    },
    {
      chatroom_id: 2,
      message_id: 3,
      sender_name: "박준호",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "네, 그 시간에 맞춰서 진행하도록 하죠!",
      send_time: "2024-01-25 19:10"
    },
    {
      chatroom_id: 2,
      message_id: 4,
      sender_name: "이서영",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "스터디 주제는 무엇으로 할까요?",
      send_time: "2024-01-25 19:15"
    },
    {
      chatroom_id: 2,
      message_id: 5,
      sender_name: "김재영",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "프로젝트 관리 방법에 대해서 얘기해볼까요?",
      send_time: "2024-01-25 19:20"
    }
  ],
  3: [
    {
      chatroom_id: 3,
      message_id: 1,
      sender_name: "김지수",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "오늘의 명언을 하나 공유해볼게요. '노력은 배신하지 않는다'라는 말이 있죠.",
      send_time: "2024-01-24 09:25"
    },
    {
      chatroom_id: 3,
      message_id: 2,
      sender_name: "이동훈",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "맞아요. 노력하면 결국 성과가 따라온다는 거죠.",
      send_time: "2024-01-24 09:30"
    },
    {
      chatroom_id: 3,
      message_id: 3,
      sender_name: "박지우",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "마음에 와닿는 말이네요. 자주 명언을 공유해주세요!",
      send_time: "2024-01-24 09:35"
    },
    {
      chatroom_id: 3,
      message_id: 4,
      sender_name: "정윤호",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "네, 저도 명언을 좋아합니다. 함께 공유해요!",
      send_time: "2024-01-24 09:40"
    },
    {
      chatroom_id: 3,
      message_id: 5,
      sender_name: "김민지",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "다들 고마워요. 오늘 하루도 힘차게 시작해봐요!",
      send_time: "2024-01-24 09:45"
    }
  ],
  4: [
    {
      chatroom_id: 4,
      message_id: 1,
      sender_name: "홍길동",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "프로그래밍 입문 모임에 오신 것을 환영합니다!",
      send_time: "2024-01-23 16:15"
    },
    {
      chatroom_id: 4,
      message_id: 2,
      sender_name: "이순신",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "안녕하세요. 프로그래밍에 관심이 있어 가입했습니다.",
      send_time: "2024-01-23 16:20"
    },
    {
      chatroom_id: 4,
      message_id: 3,
      sender_name: "윤봉길",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "컴퓨터 공부를 시작하고 싶어서 참석했어요.",
      send_time: "2024-01-23 16:25"
    },
    {
      chatroom_id: 4,
      message_id: 4,
      sender_name: "이율곡",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "함께 공부하면 더 재미있겠죠!",
      send_time: "2024-01-23 16:30"
    },
    {
      chatroom_id: 4,
      message_id: 5,
      sender_name: "김유신",
      sender_profile: "https://source.unsplash.com/featured/?avatar",
      message: "네, 함께 열심히 해봐요!",
      send_time: "2024-01-23 16:35"
    }
  ],

}