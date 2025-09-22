import React, { useState, useMemo } from 'react';

// Enhanced dummy events data with all required fields
const dummyEvents = [
  {
    id: 1,
    title: "Tech Club Hackathon",
    date: "2025-10-15",
    time: "09:00",
    category: "Club",
    description: "24-hour hackathon organized by Tech Club.",
    organizer: "Student",
    status: "Upcoming"
  },
  {
    id: 2,
    title: "Cultural Fest 2025",
    date: "2025-11-02",
    time: "10:00",
    category: "General",
    description: "Annual cultural festival with music, dance, and drama.",
    organizer: "Alumni",
    status: "Upcoming"
  },
  {
    id: 3,
    title: "Robotics Workshop",
    date: "2025-09-30",
    time: "14:00",
    category: "Club",
    description: "Hands-on robotics workshop for beginners.",
    organizer: "Student",
    status: "Upcoming"
  },
  {
    id: 4,
    title: "Alumni Meet 2025",
    date: "2025-12-20",
    time: "18:00",
    category: "General",
    description: "Reunion of alumni with networking sessions.",
    organizer: "Alumni",
    status: "Upcoming"
  },
  {
    id: 5,
    title: "Photography Contest",
    date: "2025-10-25",
    time: "11:00",
    category: "Club",
    description: "Photography competition organized by the Media Club.",
    organizer: "Student",
    status: "Upcoming"
  },
  {
    id: 6,
    title: "Career Fair 2025",
    date: "2025-11-15",
    time: "09:30",
    category: "General",
    description: "Companies coming for recruitment and internships.",
    organizer: "Alumni",
    status: "Upcoming"
  },
  {
    id: 7,
    title: "Science Exhibition",
    date: "2024-12-15",
    time: "10:00",
    category: "Club",
    description: "Annual science exhibition showcasing student projects.",
    organizer: "Student",
    status: "Completed"
  },
  {
    id: 8,
    title: "New Year Celebration",
    date: "2024-12-31",
    time: "20:00",
    category: "General",
    description: "New Year celebration with cultural performances.",
    organizer: "Alumni",
    status: "Completed"
  }
];

function Events() {
  const [events, setEvents] = useState(dummyEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    category: 'Club',
    description: '',
    organizer: 'Student'
  });

  // Update event status based on current date
  const updateEventStatus = (event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);
    
    return eventDate < today ? 'Completed' : 'Upcoming';
  };

  // Filter and search events
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || event.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [events, searchTerm, selectedCategory, selectedStatus]);

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentEvent = (event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  };

  const handleViewMore = (eventId) => {
    console.log(`View more details for event ${eventId}`);
    alert(`View more details for event ${eventId} - Feature coming soon!`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString || 'TBD';
  };

  const handleEventFormChange = (e) => {
    const { name, value } = e.target;
    setEventForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    
    if (!eventForm.title || !eventForm.date || !eventForm.time) {
      alert('Please fill in all required fields');
      return;
    }

    const newEvent = {
      id: events.length + 1,
      title: eventForm.title,
      date: eventForm.date,
      time: eventForm.time,
      category: eventForm.category,
      description: eventForm.description,
      organizer: eventForm.organizer,
      status: updateEventStatus({ date: eventForm.date })
    };

    setEvents(prev => [...prev, newEvent]);
    setEventForm({
      title: '',
      date: '',
      time: '',
      category: 'Club',
      description: '',
      organizer: 'Student'
    });
    setShowEventForm(false);
    alert('Event created successfully!');
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      padding: '2rem 1rem'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '3rem' 
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: '#1e293b',
            marginBottom: '0.5rem'
          }}>
            Events
          </h1>
          <p style={{ 
            color: '#64748b', 
            fontSize: '1.1rem' 
          }}>
            Discover and participate in upcoming events
          </p>
        </div>

        {/* Search and Filter Section */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem',
          marginBottom: '2rem',
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          {/* Search Bar */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search events by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
            <span style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#64748b',
              fontSize: '1.2rem'
            }}>
              🔍
            </span>
          </div>

          {/* Filter Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            {['All', 'Club', 'General'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '2px solid',
                  borderRadius: '6px',
                  backgroundColor: selectedCategory === category ? '#3b82f6' : 'transparent',
                  color: selectedCategory === category ? 'white' : '#3b82f6',
                  borderColor: '#3b82f6',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category) {
                    e.target.style.backgroundColor = '#eff6ff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {category} Events
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div style={{ 
          marginBottom: '1.5rem',
          color: '#64748b',
          fontSize: '0.9rem'
        }}>
          Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
          {searchTerm && ` matching "${searchTerm}"`}
          {selectedCategory !== 'All' && ` in ${selectedCategory} category`}
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  border: '1px solid #e2e8f0'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Event Header */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 'bold', 
                    color: '#1e293b',
                    margin: 0,
                    lineHeight: '1.3'
                  }}>
                    {event.title}
                  </h3>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backgroundColor: event.category === 'Club' ? '#dbeafe' : '#f0fdf4',
                    color: event.category === 'Club' ? '#1e40af' : '#166534'
                  }}>
                    {event.category}
                  </span>
                </div>

                {/* Event Date */}
                <div style={{ 
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ color: '#64748b', fontSize: '1rem' }}>📅</span>
                  <span style={{ 
                    color: '#475569', 
                    fontWeight: '500' 
                  }}>
                    {formatDate(event.date)}
                  </span>
                </div>

                {/* Event Description */}
                <p style={{ 
                  color: '#64748b', 
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  fontSize: '0.95rem'
                }}>
                  {event.description}
                </p>

                {/* View More Button */}
                <button
                  onClick={() => handleViewMore(event.id)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
                >
                  View More
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* No Results */
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ 
              fontSize: '3rem', 
              marginBottom: '1rem' 
            }}>
              🔍
            </div>
            <h3 style={{ 
              color: '#64748b', 
              marginBottom: '0.5rem',
              fontSize: '1.25rem'
            }}>
              No events found
            </h3>
            <p style={{ 
              color: '#94a3b8',
              fontSize: '0.95rem'
            }}>
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
