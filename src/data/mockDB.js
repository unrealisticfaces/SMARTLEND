export const mockInventory = [
  { id: 1, inventory_code: 'BOK-001', name: 'Introduction to Algorithms', category: 'Computer Science', status: 'Available', rating: 4.8, reviews: 124, author: 'Thomas H. Cormen', pages: 1312, year: 2009, description: "A comprehensive guide to algorithms, covering everything from sorting to dynamic programming. The absolute holy grail for BSIT students.", image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80' },
  { id: 2, inventory_code: 'BOK-002', name: 'Clean Code', category: 'Computer Science', status: 'Borrowed', rating: 4.9, reviews: 342, author: 'Robert C. Martin', pages: 464, year: 2008, description: "A Handbook of Agile Software Craftsmanship. Essential reading for any aspiring software developer who wants to write code that doesn't just work, but lasts.", image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80' },
  { id: 3, inventory_code: 'BOK-003', name: 'Database System Concepts', category: 'Academics', status: 'Available', rating: 4.7, reviews: 89, author: 'Abraham Silberschatz', pages: 1376, year: 2019, description: "Comprehensive coverage of database systems, SQL, and database design principles. Perfect for your backend architecture classes.", image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80' },
  { id: 4, inventory_code: 'BOK-004', name: 'Discrete Mathematics', category: 'Mathematics', status: 'Maintenance', rating: 4.2, reviews: 56, author: 'Kenneth H. Rosen', pages: 1088, year: 2018, description: "Mathematical structures that are fundamentally discrete rather than continuous. A must-have for understanding computer logic.", image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=400&q=80' },
  { id: 5, inventory_code: 'BOK-005', name: 'Calculus: Early Transcendentals', category: 'Mathematics', status: 'Available', rating: 4.6, reviews: 145, author: 'James Stewart', pages: 1368, year: 2020, description: "The standard textbook for university-level calculus, featuring clear explanations and rigorous problem sets.", image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=400&q=80' },
  { id: 6, inventory_code: 'BOK-006', name: 'The Pragmatic Programmer', category: 'Computer Science', status: 'Borrowed', rating: 4.9, reviews: 302, author: 'David Thomas', pages: 352, year: 2019, description: "Journey from journeyman to master. A collection of practical tips and philosophies that will change how you approach software engineering.", image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80' },
  { id: 7, inventory_code: 'BOK-007', name: 'Artificial Intelligence: A Modern Approach', category: 'Computer Science', status: 'Borrowed', rating: 4.8, reviews: 412, author: 'Stuart Russell', pages: 1166, year: 2020, description: "The definitive textbook on AI, covering machine learning, search algorithms, and natural language processing.", image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&q=80' },
  { id: 8, inventory_code: 'BOK-008', name: 'University Physics', category: 'Academics', status: 'Available', rating: 4.5, reviews: 178, author: 'Hugh D. Young', pages: 1600, year: 2019, description: "Comprehensive physics textbook covering mechanics, thermodynamics, and electromagnetism.", image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80' },
  { id: 9, inventory_code: 'BOK-009', name: '1984', category: 'Fiction', status: 'Available', rating: 4.9, reviews: 315, author: 'George Orwell', pages: 328, year: 1949, description: "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism. A great palate cleanser between coding sessions.", image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80' },
  { id: 10, inventory_code: 'BOK-010', name: 'Design Patterns', category: 'Computer Science', status: 'Available', rating: 4.7, reviews: 892, author: 'Erich Gamma', pages: 395, year: 1994, description: "Elements of Reusable Object-Oriented Software. The classic 'Gang of Four' book that established modern software design patterns.", image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80' },
  { id: 11, inventory_code: 'BOK-011', name: 'Computer Networking: A Top-Down Approach', category: 'Computer Science', status: 'Available', rating: 4.8, reviews: 214, author: 'James Kurose', pages: 864, year: 2020, description: "A comprehensive guide to networking concepts, covering the internet, protocols, and architecture from the application layer down.", image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80' },
  { id: 12, inventory_code: 'BOK-012', name: 'Operating System Concepts', category: 'Computer Science', status: 'Borrowed', rating: 4.6, reviews: 156, author: 'Abraham Silberschatz', pages: 976, year: 2018, description: "The classic 'Dinosaur Book' covering memory management, concurrent processes, and file systems.", image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=400&q=80' },
  { id: 13, inventory_code: 'BOK-013', name: 'To Kill a Mockingbird', category: 'Fiction', status: 'Available', rating: 4.9, reviews: 1205, author: 'Harper Lee', pages: 281, year: 1960, description: "A classic of modern American literature exploring racial injustice and moral growth in the Deep South.", image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80' },
  { id: 14, inventory_code: 'BOK-014', name: 'Linear Algebra and Its Applications', category: 'Mathematics', status: 'Available', rating: 4.5, reviews: 198, author: 'David C. Lay', pages: 576, year: 2020, description: "An introduction to linear algebra with applications in engineering, computer science, and economics.", image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80' },
  { id: 15, inventory_code: 'BOK-015', name: 'The C Programming Language', category: 'Computer Science', status: 'Available', rating: 4.9, reviews: 512, author: 'Brian W. Kernighan', pages: 274, year: 1988, description: "Also known as 'K&R'. The foundational text on C programming, essential for understanding low-level computing.", image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=400&q=80' },
  { id: 16, inventory_code: 'BOK-016', name: 'Fundamentals of Software Architecture', category: 'Computer Science', status: 'Maintenance', rating: 4.7, reviews: 145, author: 'Mark Richards', pages: 432, year: 2020, description: "An engineering approach to designing large-scale software systems and architectural patterns.", image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80' },
  { id: 17, inventory_code: 'BOK-017', name: 'A Brief History of Time', category: 'Academics', status: 'Available', rating: 4.8, reviews: 890, author: 'Stephen Hawking', pages: 256, year: 1988, description: "A landmark volume in science writing exploring cosmology, black holes, and the nature of the universe.", image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80' },
  { id: 18, inventory_code: 'BOK-018', name: 'Head First Design Patterns', category: 'Computer Science', status: 'Borrowed', rating: 4.8, reviews: 345, author: 'Eric Freeman', pages: 694, year: 2004, description: "A brain-friendly guide to understanding and implementing software design patterns in object-oriented systems.", image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80' },
  { id: 19, inventory_code: 'BOK-019', name: 'Data Science from Scratch', category: 'Computer Science', status: 'Available', rating: 4.5, reviews: 210, author: 'Joel Grus', pages: 406, year: 2019, description: "First principles approach to understanding data science and machine learning algorithms using Python.", image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80' },
  { id: 20, inventory_code: 'BOK-020', name: 'Dune', category: 'Fiction', status: 'Available', rating: 4.9, reviews: 1560, author: 'Frank Herbert', pages: 412, year: 1965, description: "The epic science fiction masterpiece exploring politics, religion, and ecology on the desert planet Arrakis.", image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80' }
];

export const mockUsers = [
  { email: 'admin@uc.edu.ph', password: 'password', role: 'admin', name: 'System Administrator', id: 'ADMIN-01', department: 'Staff', avatar: 'https://ui-avatars.com/api/?name=System+Admin&background=206bc4&color=fff' },
  { email: 'student@uc.edu.ph', password: 'password', role: 'student', name: 'Keith David Dalocanog', id: 'BSIT-12345', department: 'BSIT', avatar: 'https://ui-avatars.com/api/?name=Keith+David+Dalocanog&background=34A853&color=fff' },
  { email: 'sao@uc.edu.ph', password: 'password', role: 'sao', name: 'SAO Officer', id: 'SAO-999', department: 'Staff', avatar: 'https://ui-avatars.com/api/?name=SAO+Officer&background=f59f00&color=fff' }
];

export const mockNotifications = [
  { id: 1, title: 'Reservation Approved', message: 'Your request for Introduction to Algorithms has been approved.', time: '10 mins ago', read: false },
  { id: 2, title: 'Overdue Warning', message: 'Please return Discrete Mathematics to the SAO office.', time: '2 hours ago', read: false },
  { id: 3, title: 'System Update', message: 'New Computer Science books have been added to the library.', time: '1 day ago', read: true }
];

const generateTransactions = () => {
  const depts = ['BSIT', 'BSBA', 'BSCRIM', 'BSED', 'CPE'];
  const statuses = ['Returned', 'Returned', 'Borrowed', 'Pending', 'Cancelled'];
  const txs = [];
  const volumeCurve = [2, 3, 2, 4, 5, 2, 1, 3, 5, 6, 8, 7, 5, 4, 3, 6, 8, 10, 9, 7, 5, 4, 3, 2, 4, 5, 3, 2, 4, 3];
  
  let txId = 2000;
  volumeCurve.forEach((vol, index) => {
    const day = String(index + 1).padStart(2, '0');
    for(let i = 0; i < vol; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      txs.push({
        transaction_id: `TXN-${txId--}`,
        student_id: `${depts[Math.floor(Math.random() * depts.length)]}-${Math.floor(10000 + Math.random() * 90000)}`,
        department: depts[Math.floor(Math.random() * depts.length)],
        item_id: Math.floor(Math.random() * 20) + 1,
        status: status,
        request_date: `2026-09-${day}`,
        processed_by: (status === 'Returned' || status === 'Borrowed') ? 'SAO-999' : null
      });
    }
  });
  return txs.reverse(); 
};

export const mockTransactions = generateTransactions();