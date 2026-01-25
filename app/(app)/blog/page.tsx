'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FileText,
  Calendar,
  ArrowRight,
  Search,
  Clock,
  TrendingUp,
  Sparkles,
  Code2,
  Shield,
  DollarSign,
  Rocket,
  Mail,
  Tag,
  Filter,
  BookOpen,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [emailSubscribe, setEmailSubscribe] = useState('');

  // Blog post data structure
  const posts = [
    {
      id: 1,
      title: 'Introducing DORA Metrics in DevControl',
      description:
        'Track deployment frequency, lead time, change failure rate, and recovery time with our new DORA metrics dashboard. Learn how elite performers measure success.',
      date: '2024-01-15',
      category: 'Product',
      author: {
        name: 'Sarah Chen',
        role: 'Product Manager',
        avatar: 'SC',
      },
      readTime: '5 min read',
      tags: ['DORA', 'Metrics', 'DevOps'],
      featured: true,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Best Practices for Service Catalog Management',
      description:
        'Learn how leading engineering teams organize and maintain their service catalogs at scale. A comprehensive guide to ownership, metadata, and discoverability.',
      date: '2024-01-10',
      category: 'Engineering',
      author: {
        name: 'Michael Torres',
        role: 'Staff Engineer',
        avatar: 'MT',
      },
      readTime: '8 min read',
      tags: ['Service Catalog', 'Best Practices', 'Platform Engineering'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'Reducing AWS Costs with Infrastructure Visibility',
      description:
        'How one team saved 30% on their AWS bill by understanding their infrastructure dependencies. Real-world strategies for cost optimization.',
      date: '2024-01-08',
      category: 'Case Study',
      author: {
        name: 'Emily Rodriguez',
        role: 'Solutions Architect',
        avatar: 'ER',
      },
      readTime: '6 min read',
      tags: ['AWS', 'Cost Optimization', 'Case Study'],
      featured: true,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      title: 'The Platform Engineering Maturity Model',
      description:
        'A framework for assessing and improving your internal developer platform. Understand where you are and how to level up.',
      date: '2024-01-05',
      category: 'Engineering',
      author: {
        name: 'David Kim',
        role: 'Engineering Lead',
        avatar: 'DK',
      },
      readTime: '10 min read',
      tags: ['Platform Engineering', 'Framework', 'Maturity Model'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      title: 'Security Scanning at Scale: Lessons Learned',
      description:
        'How we built a security scanning system that checks 10,000+ resources daily without impacting performance. Architecture and best practices.',
      date: '2024-01-03',
      category: 'Security',
      author: {
        name: 'Alex Thompson',
        role: 'Security Engineer',
        avatar: 'AT',
      },
      readTime: '7 min read',
      tags: ['Security', 'Scanning', 'Architecture'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 6,
      title: 'From Chaos to Clarity: Service Ownership Models',
      description:
        'Establishing clear ownership for microservices. How to define responsibilities, on-call rotations, and accountability in distributed systems.',
      date: '2024-01-01',
      category: 'Engineering',
      author: {
        name: 'Jessica Park',
        role: 'Engineering Manager',
        avatar: 'JP',
      },
      readTime: '9 min read',
      tags: ['Ownership', 'Microservices', 'Teams'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const categories = [
    { name: 'All', icon: BookOpen, count: posts.length },
    { name: 'Product', icon: Sparkles, count: posts.filter((p) => p.category === 'Product').length },
    { name: 'Engineering', icon: Code2, count: posts.filter((p) => p.category === 'Engineering').length },
    { name: 'Security', icon: Shield, count: posts.filter((p) => p.category === 'Security').length },
    { name: 'Case Study', icon: TrendingUp, count: posts.filter((p) => p.category === 'Case Study').length },
  ];

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
            <FileText className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            DevControl Blog
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Platform engineering insights, product updates, and best practices from industry
            leaders and the DevControl team.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter by category</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.name)}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                  <Badge
                    variant="secondary"
                    className={`ml-1 ${
                      selectedCategory === category.name
                        ? 'bg-primary-foreground/20'
                        : 'bg-muted'
                    }`}
                  >
                    {category.count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === 'All' && searchQuery === '' && featuredPosts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-amber-500" />
              <h2 className="text-2xl font-bold text-foreground">Featured Articles</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.slice(0, 2).map((post) => (
                <Card
                  key={post.id}
                  className="group hover:shadow-xl transition-all cursor-pointer overflow-hidden"
                >
                  {/* Featured Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-amber-500 text-white border-0 shadow-lg">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm">
                      {post.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-xs font-semibold">
                          {post.author.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{post.author.name}</div>
                          <div className="text-xs text-muted-foreground">{post.author.role}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div className="mb-12">
          {selectedCategory !== 'All' || searchQuery !== '' ? (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'Article' : 'Articles'}
                {searchQuery && ` matching "${searchQuery}"`}
              </h2>
            </div>
          ) : (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">Latest Articles</h2>
            </div>
          )}

          {filteredPosts.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                variant="outline"
              >
                Clear filters
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(selectedCategory === 'All' && searchQuery === '' ? regularPosts : filteredPosts).map(
                (post) => (
                  <Card
                    key={post.id}
                    className="group hover:shadow-lg transition-all cursor-pointer flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-40 overflow-hidden bg-muted">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>

                    <CardHeader className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="mt-2 text-sm line-clamp-3">
                        {post.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-xs font-semibold">
                            {post.author.avatar}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {post.author.name}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs bg-muted hover:bg-muted/80"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          )}
        </div>

        {/* Newsletter Subscription */}
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20 mb-12">
          <CardContent className="pt-8 pb-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                Stay Updated with DevControl
              </h3>
              <p className="text-muted-foreground mb-6">
                Get the latest platform engineering insights, product updates, and best practices
                delivered to your inbox every week.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={emailSubscribe}
                  onChange={(e) => setEmailSubscribe(e.target.value)}
                  className="flex-1 h-11 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button className="gap-2 h-11">
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Join 5,000+ platform engineers. Unsubscribe anytime.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Popular Topics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Popular Topics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'DORA Metrics', icon: TrendingUp, count: 12 },
              { name: 'Cost Optimization', icon: DollarSign, count: 8 },
              { name: 'Platform Engineering', icon: Rocket, count: 15 },
              { name: 'Security', icon: Shield, count: 10 },
            ].map((topic) => {
              const Icon = topic.icon;
              return (
                <Card
                  key={topic.name}
                  className="hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm group-hover:text-primary transition-colors">
                          {topic.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {topic.count} articles
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Resources Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <Link href="/docs">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                  <BookOpen className="w-5 h-5" />
                  Documentation
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
                <CardDescription>
                  Comprehensive guides, tutorials, and API references
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <Link href="/changelog">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                  <Sparkles className="w-5 h-5" />
                  Changelog
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
                <CardDescription>
                  See what&apos;s new and improved in DevControl
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
