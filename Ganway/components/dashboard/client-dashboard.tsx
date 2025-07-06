"use client"

import { FashionFeed } from "./fashion-feed"
import { AIRecommendations } from "./ai-recommendations"
import { QuickActions } from "./quick-actions"
import { UserActivity } from "./user-activity"

export function ClientDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <FashionFeed />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <QuickActions />
            <UserActivity />
          </div>
        </div>

        {/* AI Recommendations Section */}
        <AIRecommendations />
      </div>
    </div>
  )
}
