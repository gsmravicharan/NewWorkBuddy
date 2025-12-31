import React from "react";
import { Bell, Search, CheckCircle, Clock, List, MessageSquare } from "lucide-react";
import { Card, CardContent } from "../UI/card";
import { Button } from "../UI/button";

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Search className="text-gray-400" />
          <input
            placeholder="Search requests, workers..."
            className="bg-white px-4 py-2 rounded-lg shadow text-sm outline-none"
          />
        </div>
        <div className="flex items-center gap-4">
          <Bell />
          <img
            src="https://i.pravatar.cc/100"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Profile Card */}
        <Card className="col-span-12 lg:col-span-3 rounded-2xl shadow">
          <CardContent className="p-6 text-center">
            <img
              src="https://i.pravatar.cc/150"
              className="w-24 h-24 rounded-full mx-auto mb-3"
            />
            <h2 className="text-lg font-semibold">Rahul Sharma</h2>
            <p className="text-sm text-gray-500">Bangalore, India</p>
            <div className="flex justify-center gap-3 mt-4">
              <Button size="sm">Edit Profile</Button>
              <Button size="sm" variant="outline">Support</Button>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
              <div><p className="font-semibold">18</p><p>Requests</p></div>
              <div><p className="font-semibold">12</p><p>Completed</p></div>
              <div><p className="font-semibold">3</p><p>Ongoing</p></div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="col-span-12 lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-2xl shadow">
            <CardContent className="p-6 flex items-center gap-4">
              <List className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Total Requests</p>
                <h3 className="text-xl font-semibold">18</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow">
            <CardContent className="p-6 flex items-center gap-4">
              <Clock className="text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Ongoing</p>
                <h3 className="text-xl font-semibold">3</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow">
            <CardContent className="p-6 flex items-center gap-4">
              <CheckCircle className="text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <h3 className="text-xl font-semibold">12</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ongoing Requests */}
        <Card className="col-span-12 lg:col-span-7 rounded-2xl shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Ongoing Requests</h3>
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-3 border-b last:border-none"
              >
                <div>
                  <p className="font-medium">AC Repair Service</p>
                  <p className="text-sm text-gray-500">Worker: Suresh Kumar</p>
                </div>
                <Button size="sm" variant="outline">Track</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Completed Requests */}
        <Card className="col-span-12 lg:col-span-5 rounded-2xl shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Completed Requests</h3>
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-3 border-b last:border-none"
              >
                <p className="text-sm">Plumbing Service</p>
                <CheckCircle className="text-green-500 w-4 h-4" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="col-span-12 rounded-2xl shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Recent Messages</h3>
            <div className="flex items-center gap-3">
              <MessageSquare className="text-blue-500" />
              <p className="text-sm text-gray-600">You have 2 unread messages from workers</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
