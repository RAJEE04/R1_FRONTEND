import React, { useEffect, useState } from "react";
import API from "../api";

interface Review {
  _id?: string;
  productId: number;
  username: string;
  rating: number;
  comment: string;
}

interface Props {
  productId: number; // productId from ProductDetails
}

const ReviewSection: React.FC<Props> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const username = localStorage.getItem("username") || "";

  /* ================= FETCH REVIEWS ================= */

  const fetchReviews = async () => {
  try {
    const res = await API.get(`/reviews/${productId}`);
    setReviews(res.data);
  } catch (err) {
    console.error("FETCH REVIEWS ERROR:", err);
  }
};


  /* ================= ADD REVIEW ================= */

  const handleSubmit = async () => {
    if (!username) {
      alert("You must be logged in to review");
      return;
    }

    try {
      await API.post("/reviews", {
        productId,
        username,
        rating,
        comment,
      });

      setRating(0);
      setComment("");
      fetchReviews();
    } catch (err) {
      console.error("POST REVIEW ERROR:", err);
    }
  };

  /* ================= DELETE REVIEW ================= */

  const handleDelete = async (id: string) => {
    try {
      await API.delete(`/reviews/${id}`, {
        data: { username },
      });
      fetchReviews();
    } catch (err) {
      console.error("DELETE REVIEW ERROR:", err);
    }
  };

  /* ================= EDIT REVIEW ================= */

  const handleEdit = async (r: Review) => {
    const updatedComment = prompt("Edit your review", r.comment);
    if (!updatedComment) return;

    const updatedRating = Number(
      prompt("Edit rating (1-5)", r.rating.toString())
    );
    if (updatedRating < 1 || updatedRating > 5) return;

    try {
      await API.put(`/reviews/${r._id}`, {
        username,
        comment: updatedComment,
        rating: updatedRating,
      });
      fetchReviews();
    } catch (err) {
      console.error("EDIT REVIEW ERROR:", err);
    }
  };

  /* ================= EFFECT ================= */

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

  /* ================= UI ================= */

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold">Reviews</h2>
      <p className="text-yellow-500 font-medium">
        ⭐ Average Rating: {avgRating.toFixed(1)}
      </p>

      {/* Add Review */}
      <div className="mt-4 p-4 border rounded-lg bg-gray-50">
        <h3 className="font-semibold mb-2">Add Your Review</h3>

        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              onClick={() => setRating(s)}
              className={`cursor-pointer text-2xl ${
                rating >= s ? "text-yellow-400" : "text-gray-400"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          className="w-full p-2 border rounded mb-2"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>

      {/* Reviews List */}
      <div className="mt-6 space-y-4">
        {reviews.map((r) => (
          <div key={r._id} className="p-4 border rounded-lg bg-white">
            <h4 className="font-semibold">
              {r.username} — {"★".repeat(r.rating)}
            </h4>
            <p>{r.comment}</p>

            {r.username === username && (
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(r)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(r._id!)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
