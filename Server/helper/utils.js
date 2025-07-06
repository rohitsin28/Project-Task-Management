import jwt from "jsonwebtoken";

export const createToken = async (userId) => {
  return jwt.sign({ userId }, process.env.JWT_TOKEN_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

export const pagination = async ({
  model,
  query = {},
  page = 1,
  limit = 10,
  select = "",
  sort = { _id: -1 },
  populate = "",
}) => {
  try {
    page = Math.max(1, parseInt(page));
    limit = Math.max(1, parseInt(limit));
    const startIndex = (page - 1) * limit;

    const totalDocuments = await model.countDocuments(query);
    let queryBuilder = model
      .find(query)
      .sort(sort)
      .skip(startIndex)
      .limit(limit)
      .select(select);

    if (populate) {
      if (Array.isArray(populate)) {
        populate.forEach((pop) => (queryBuilder = queryBuilder.populate(pop)));
      } else {
        queryBuilder = queryBuilder.populate(populate);
      }
    }

    const results = await queryBuilder;

    return {
      totalPages: Math.ceil(totalDocuments / limit),
      totalDocuments,
      currentPage: page,
      hasNextPage: startIndex + results.length < totalDocuments,
      hasPreviousPage: page > 1,
      results,
    };
  } catch (err) {
    console.error("Error from pagination function =>", err);
    throw new Error("Pagination Error: " + err.message);
  }
};
