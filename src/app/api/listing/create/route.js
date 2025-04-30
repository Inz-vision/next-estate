import Listing from '../../../../lib/models/listing.model.js';
import { connect } from '../../../../lib/mongodb/mongoose.js';
import { currentUser } from '@clerk/nextjs/server';
export const POST = async (req) => {
  const user = await currentUser();
  console.log('Current user:', user);

  try {
    await connect();
    console.log('MongoDB connected successfully');

    const data = await req.json();
    console.log('Request data:', data);

    if (!user || user?.publicMetadata?.userMogoId !== data?.userMongoId) {
      console.log('Unauthorized access:', {
        userMongoIdFromClerk: user?.publicMetadata?.userMogoId,
        userMongoIdFromRequest: data?.userMongoId,
      });
      return new Response('Unauthorized', {
        status: 401,
      });
    }
    const newListing = await Listing.create({
      userRef: user?.publicMetadata?.userMogoId,
      name: data.name,
      description: data.description,
      address: data.address,
      regularPrice: data.regularPrice,
      discountPrice: data.discountPrice,
      bathrooms: data.bathrooms,
      bedrooms: data.bedrooms,
      furnished: data.furnished,
      parking: data.parking,
      type: data.type,
      offer: data.offer,
      imageUrls: data.imageUrls,
    });

    console.log('New listing created:', newListing);

    await newListing.save();

    return new Response(JSON.stringify(newListing), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://next-estate-zeta.vercel.app',
      },
    });
  } catch (error) {
    console.log('Error creating post:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error creating listing' }),
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': 'https://next-estate-zeta.vercel.app',
        },
      }
    );
  }
};