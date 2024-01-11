// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const apiResponse = await fetch(
    "https://api.ustabilir.com/api/v1/static/location/cities"
  );
  const cityData = await apiResponse.json();

  res.status(200).json(cityData);
}
