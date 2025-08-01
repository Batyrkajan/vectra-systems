import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY from .env.local');
  process.exit(1);
}

// Create admin client with service role key (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
});

const roadmaps = [
  {
    title: 'Foundations of Machine Learning',
    price: 29.99,
    description: 'A comprehensive roadmap covering the basics of machine learning, from data preprocessing to model evaluation.',
    category: 'ML',
    topics: [
      { title: 'Introduction to ML', resource: 'https://example.com/intro-ml', description: 'What is ML and why is it important?' },
      { title: 'Data Preprocessing', resource: 'https://example.com/data-prep', description: 'Cleaning and preparing data for ML models.' },
      { title: 'Supervised Learning', resource: 'https://example.com/supervised', description: 'Understanding regression and classification algorithms.' },
      { title: 'Model Evaluation', resource: 'https://example.com/evaluation', description: 'Metrics and techniques to assess model performance.' },
    ],
    rating: 0,
    reviews: []
  },
  {
    title: 'Deep Learning with TensorFlow',
    price: 49.99,
    description: 'Dive deep into neural networks and TensorFlow with practical examples and projects.',
    category: 'ML',
    topics: [
      { title: 'Neural Network Basics', resource: 'https://example.com/nn-basics', description: 'Perceptrons, activation functions, and backpropagation.' },
      { title: 'Convolutional Neural Networks', resource: 'https://example.com/cnn', description: 'Image recognition with CNNs.' },
      { title: 'Recurrent Neural Networks', resource: 'https://example.com/rnn', description: 'Sequence data processing with RNNs.' },
      { title: 'TensorFlow Keras API', resource: 'https://example.com/tf-keras', description: 'Building and training models with Keras.' },
    ],
    rating: 0,
    reviews: []
  },
  {
    title: 'Natural Language Processing Fundamentals',
    price: 0, // Free roadmap
    description: 'Learn the core concepts of NLP, from text processing to sentiment analysis.',
    category: 'ML',
    topics: [
      { title: 'Text Preprocessing', resource: 'https://example.com/text-prep', description: 'Tokenization, stemming, and lemmatization.' },
      { title: 'Bag-of-Words and TF-IDF', resource: 'https://example.com/bow-tfidf', description: 'Representing text data numerically.' },
      { title: 'Sentiment Analysis', resource: 'https://example.com/sentiment', description: 'Classifying text sentiment.' },
    ],
    rating: 0,
    reviews: []
  },
];

async function getOrCreateDummyCreator() {
  const dummyEmail = 'dummy-creator@example.com';
  const dummyPassword = 'securepassword123'; // Change to a strong password
  const dummyRole = 'creator';

  // List all users to find if dummy exists
  const { data: usersList, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error('❌ Failed to list users:', listError.message);
    throw listError;
  }

  const existingAuthUser = usersList.users.find(u => u.email === dummyEmail);

  let creator_id;
  if (existingAuthUser) {
    creator_id = existingAuthUser.id;
    console.log(`ℹ️ Found existing auth user with email ${dummyEmail}. Using ID: ${creator_id}`);
  } else {
    // Create new auth user
    const { data: createData, error: createError } = await supabase.auth.admin.createUser({
      email: dummyEmail,
      password: dummyPassword,
      email_confirm: true // Auto-confirm email for seeding
    });
    if (createError) {
      console.error('❌ Failed to create auth user:', createError.message);
      throw createError;
    }
    creator_id = createData.user.id;
    console.log(`✅ Created new auth user with ID: ${creator_id}`);
  }

  // Upsert into custom 'users' table
  const { data: userData, error: upsertError } = await supabase.from('users').upsert({
    id: creator_id,
    role: dummyRole,
    email: dummyEmail,
    purchased_roadmaps: [],
    progress: {}
  }, { onConflict: 'id' });
  if (upsertError) {
    console.error('❌ Failed to upsert into users table:', upsertError.message);
    throw upsertError;
  }
  console.log(`✅ Upserted dummy creator into users table with ID: ${creator_id}`);

  return creator_id;
}

async function addRoadmaps() {
  console.log('Attempting to insert roadmaps...');

  // Get or create dummy creator
  let creator_id;
  try {
    creator_id = await getOrCreateDummyCreator();
  } catch (error) {
    console.error('❌ Error in getOrCreateDummyCreator:', error.message);
    return;
  }

  // Insert roadmaps with creator_id
  for (const roadmap of roadmaps) {
    const roadmapWithCreator = { ...roadmap, creator_id }; // Attach creator_id
    const { data, error } = await supabase.from('roadmaps').insert(roadmapWithCreator);
    if (error) {
      console.error(`❌ Failed to insert roadmap "${roadmap.title}":`, error.message);
    } else {
      console.log(`✅ Successfully inserted roadmap: "${roadmap.title}"`);
    }
  }
  console.log('Roadmap insertion process complete.');
}

addRoadmaps();