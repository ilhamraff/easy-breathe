import React from "react";

export function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col items-start justify-between bg-white rounded-3xl overflow-hidden ring-1 ring-slate-200 animate-pulse">
      <div className="w-full relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/2] bg-slate-200"></div>
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 w-full">
        <div className="flex-1 w-full">
          <div className="h-6 bg-slate-200 rounded-full w-3/4 mb-4"></div>
          <div className="h-4 bg-slate-200 rounded-full w-full mb-2"></div>
          <div className="h-4 bg-slate-200 rounded-full w-5/6 mb-2"></div>
          <div className="h-4 bg-slate-200 rounded-full w-4/6"></div>
        </div>
        <div className="mt-6">
          <div className="h-4 bg-slate-200 rounded-full w-1/3"></div>
        </div>
      </div>
    </div>
  );
}

export function ArticleDetailSkeleton() {
  return (
    <div className="bg-white min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 animate-pulse">
        <div className="h-4 bg-slate-200 rounded-full w-32 mb-8"></div>
        
        <div className="mb-10 text-center flex flex-col items-center">
          <div className="h-10 bg-slate-200 rounded-full w-3/4 mb-6"></div>
          <div className="flex gap-4 w-1/2 justify-center">
            <div className="h-4 bg-slate-200 rounded-full w-24"></div>
            <div className="h-4 bg-slate-200 rounded-full w-24"></div>
          </div>
        </div>

        <div className="aspect-video w-full rounded-2xl bg-slate-200 mb-14"></div>

        <div className="space-y-4">
          <div className="h-4 bg-slate-200 rounded-full w-full"></div>
          <div className="h-4 bg-slate-200 rounded-full w-full"></div>
          <div className="h-4 bg-slate-200 rounded-full w-5/6"></div>
          <div className="h-4 bg-slate-200 rounded-full w-full"></div>
          <div className="h-4 bg-slate-200 rounded-full w-4/6"></div>
        </div>
      </div>
    </div>
  );
}

export function ForumPostSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm ring-1 ring-slate-200 animate-pulse">
      <div className="mb-4">
        <div className="h-6 bg-slate-200 rounded-full w-2/3 mb-4"></div>
        <div className="h-4 bg-slate-200 rounded-full w-1/4"></div>
      </div>
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
        <div className="h-4 bg-slate-200 rounded-full w-24"></div>
      </div>
    </div>
  );
}
