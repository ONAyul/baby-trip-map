const images = {
  cafe: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
  food: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
  play: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=900&q=80",
  kids: "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?auto=format&fit=crop&w=900&q=80",
  nature: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=900&q=80",
  sea: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  valley: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
  experience: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=900&q=80"
};

const reasons = {
  cafe: "아이와 쉬어가기 좋은 카페 동선 후보예요. 주차와 유모차 진입은 방문 전 확인해 주세요.",
  food: "식사와 주변 산책을 함께 묶기 좋은 먹거리 후보예요. 아기의자는 추가 확인이 필요해요.",
  play: "31개월 아이가 움직이며 놀기 좋은 나들이 후보예요. 주말 혼잡도를 확인해 주세요.",
  kids: "비 오는 날과 더운 날 우선 검토할 실내 놀이 후보예요. 예약 여부를 확인해 주세요.",
  nature: "유모차 산책과 짧은 체류를 같이 보기 좋은 자연 나들이 후보예요.",
  sea: "모래놀이와 바다 산책을 기대할 수 있는 해변 후보예요. 바람과 주차를 확인해 주세요.",
  valley: "물놀이와 그늘 휴식을 기대할 수 있는 계곡 후보예요. 수심과 안전요원을 확인해 주세요.",
  experience: "실내외 체험과 관람을 같이 볼 수 있는 가족 나들이 후보예요."
};

export function p(id, name, region, category, lat, lng, age, score, facts, menu) {
  return {
    id, name, region, category, lat, lng, age, score,
    image: images[category] || images.play,
    reason: reasons[category],
    facts,
    menu,
    sources: ["블로그·유튜브 확인 후보", "지도/공식정보 검증 필요"]
  };
}
