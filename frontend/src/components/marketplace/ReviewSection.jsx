import React, { useState } from 'react';
import { Star, MessageSquare, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReviews } from '../../hooks/useReviews';
import Button from '../common/Button';

const ReviewSection = ({ productId, averageRating, reviewCount }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const { useGetProductReviews, addReview } = useReviews(productId);
  const { data: reviews, isLoading } = useGetProductReviews();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    addReview.mutate({ rating, comment }, {
      onSuccess: () => {
        setComment('');
        setRating(5);
      }
    });
  };

  return (
    <div className="space-y-12">
      {/* Summary Header */}
      <div className="flex items-center gap-8 p-8 bg-slate-50 rounded-3xl">
        <div className="text-center">
          <div className="text-5xl font-black mb-2">{averageRating || '0.0'}</div>
          <div className="flex items-center gap-0.5 mb-1 justify-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} 
              />
            ))}
          </div>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">
            {reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'}
          </div>
        </div>
        
        <div className="flex-1 space-y-2 hidden sm:block">
          {[5, 4, 3, 2, 1].map(star => {
            const countForStar = reviews?.filter(r => r.rating === star).length || 0;
            const percentage = reviewCount > 0 ? (countForStar / reviewCount) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-4">
                <span className="text-xs font-bold w-4">{star}</span>
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 transition-all duration-500" 
                    style={{ width: `${percentage}%` }} 
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-bold w-8">{Math.round(percentage)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Form */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <MessageSquare size={18} className="text-blue-600" />
          Write a Review
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star 
                    className={`w-6 h-6 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} 
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              className="w-full h-32 p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none text-sm"
            />
          </div>
          <Button 
            type="submit" 
            isLoading={addReview.isPending}
            disabled={!comment.trim()}
            className="w-full sm:w-auto px-8"
          >
            <Send size={16} className="mr-2" />
            Submit Review
          </Button>
        </form>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        <h3 className="font-bold text-lg">Customer Reviews</h3>
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-50 rounded-2xl" />)}
          </div>
        ) : reviews?.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 text-sm">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence mode='popLayout'>
              {reviews?.map((review) => (
                <motion.div 
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-slate-200 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <User size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-sm">{review.user.fullName}</div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          {new Date(review.createdAt).toLocaleDateString(undefined, { 
                            month: 'short', 
                            day: '2-digit', 
                            year: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-100'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
