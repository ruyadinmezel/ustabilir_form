export default async function handler(req, res) {
  try {
    const apiResponse = await fetch(
      "https://pp-api.ustabilir.com/api/v1/static/categories/with-subcategories"
    );
    const categoryData = await apiResponse.json();

    res.status(200).json(categoryData.data);
  } catch (error) {
    console.error("Error fetching category data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
