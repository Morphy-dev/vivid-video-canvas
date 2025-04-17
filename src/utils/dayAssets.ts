interface DayAssets {
  sound: string;
  image: string;
}

const dayAssets: Record<string, DayAssets> = {
  monday: {
    sound: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/S1-01-01.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3MvUzEtMDEtMDEubXAzIiwiaWF0IjoxNzQ0OTI4MDUxLCJleHAiOjE3NDU1MzI4NTF9.r2adn2e0oTOm1OwOevXiTCfx0tUeBI-uP9obqm5ftfA",
    image: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/monday.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci9tb25kYXkucG5nIiwiaWF0IjoxNzQ0OTMwNjAxLCJleHAiOjE3NDU1MzU0MDF9.gAov7cvM53ZrrM-JkwNlDrP2m_AoHYzsOSR8FjcZqwo"
  },
  tuesday: {
    sound: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/S1-01-02.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3MvUzEtMDEtMDIubXAzIiwiaWF0IjoxNzQ0OTI4MTUxLCJleHAiOjE3NDU1MzI5NTF9.ljibREHY6sVRbubSeQC6tyLZ2NuvVkcvhWfCN_tRAbc",
    image: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/tuesday.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci90dWVzZGF5LnBuZyIsImlhdCI6MTc0NDkzMDYxMiwiZXhwIjoxNzQ1NTM1NDEyfQ.CVUZR6Rh1J8B0P-rZeowbm1K9OY3s7C9Nmy3FuJKGdA"
  },
  wednesday: {
    sound: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/S1-01-03.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3MvUzEtMDEtMDMubXAzIiwiaWF0IjoxNzQ0OTI4MTg2LCJleHAiOjE3NDU1MzI5ODZ9.tmk7bITAWh9JkZo9WcmC-1zuyHcHm7jhoUNhcM9b_mo",
    image: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/wednesday.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci93ZWRuZXNkYXkucG5nIiwiaWF0IjoxNzQ0OTMwNjI0LCJleHAiOjE3NDU1MzU0MjR9.ACSxdTjx0wE6pnCwIPCT19fRySNAvo-tIKiArSueIww"
  },
  thursday: {
    sound: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/S1-01-04.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3MvUzEtMDEtMDQubXAzIiwiaWF0IjoxNzQ0OTI5NDM4LCJleHAiOjE3NDU1MzQyMzh9.zyWV5JucLTg523aH0vhpkX4yxFwUiFQnua6i5AIE1xU",
    image: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/thursday.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci90aHVyc2RheS5wbmciLCJpYXQiOjE3NDQ5MzA2MzYsImV4cCI6MTc0NTUzNTQzNn0.E9t2D_GiRGYSoP9oq63K7o-Q1mDbHqjlYexFhGXsG3g"
  },
  friday: {
    sound: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/S1-01-05.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3MvUzEtMDEtMDUubXAzIiwiaWF0IjoxNzQ0OTI4MjU5LCJleHAiOjE3NDU1MzMwNTl9.6w9ult0QCIyXDq7Z04EiRuKF0izSVcs9gMWGNRztYP8",
    image: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/friday.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci9mcmlkYXkucG5nIiwiaWF0IjoxNzQ0OTMwNjQ1LCJleHAiOjE3NDU1MzU0NDV9.pmYO4j-dz66HEBELgaoLM4IGb9biXBF8M-w3REuDU_8"
  },
  saturday: {
    sound: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/S1-01-06.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3MvUzEtMDEtMDYubXAzIiwiaWF0IjoxNzQ0OTI4MjkwLCJleHAiOjE3NDU1MzMwOTB9.cT9B1lP3VXWc7D1yWtW55D67wxf8VPT-GJiwAn7VZSo",
    image: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/saturday.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci9zYXR1cmRheS5wbmciLCJpYXQiOjE3NDQ5MzA2NTksImV4cCI6MTc0NTUzNTQ1OX0.wK8BKJBIBel4ijYcg0qBSg0D_qyMW76iCb0TTvONMXc"
  },
  sunday: {
    sound: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/S1-01-07.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3MvUzEtMDEtMDcubXAzIiwiaWF0IjoxNzQ0OTI4MzE5LCJleHAiOjE3NDU1MzMxMTl9.O_uQPXrpLd7GLp44tlwnPzMEe1rYPCWuo-Q1WQD7SsY",
    image: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/sunday.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci9zdW5kYXkucG5nIiwiaWF0IjoxNzQ0OTMwNjcwLCJleHAiOjE3NDU1MzU0NzB9.EEnTN6kMRSwjfI1GrfoIehzpNcoYCm_6G3bezhJD1W4"
  }
};

export const getCurrentDayAssets = (): DayAssets => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = days[new Date().getDay()];
  return dayAssets[currentDay];
};
