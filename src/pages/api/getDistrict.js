export default async function handler(req, res) {
  const { cityId } = req.query;

  if (!cityId) {
    return res.status(400).json({ error: "City ID is required" });
  }

  try {
    const apiResponse = await fetch(
      `https://api.ustabilir.com/api/v1/static/location/cities/${cityId}/counties`
    );
    const districtData = await apiResponse.json();

    res.status(200).json(districtData.data);
  } catch (error) {
    console.error("Error fetching district data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
