// API endpoint to fetch Ecwid product details
// This is a placeholder that would connect to your Ecwid API

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id
    const ecwidApiKey = process.env.ECWID_API_KEY
    const ecwidStoreId = process.env.NEXT_PUBLIC_ECWID_STORE_ID

    if (!ecwidApiKey || !ecwidStoreId) {
      return Response.json(
        { error: 'Ecwid configuration missing' },
        { status: 500 }
      )
    }

    // Fetch from Ecwid API
    const response = await fetch(
      `https://app.ecwid.com/api/v3/${ecwidStoreId}/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${ecwidApiKey}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch from Ecwid')
    }

    const data = await response.json()

    return Response.json({
      id: data.id,
      name: data.name,
      price: data.price,
      options: data.options || [],
    })
  } catch (error) {
    console.error('Ecwid API error:', error)
    return Response.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
