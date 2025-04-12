export const getPickupPartners = async (req, res) => {
  try {
    if (req.user.role !== "microCollectionPartner") {
      return res.status(403).json({ error: "Access denied" });
    }

    const microCollectionPartnerId = req.user._id;

    const partners = await User.find({
      role: "pickupPartner",
      assignedPickupPartner: microCollectionPartnerId,
    });

    res.json(partners);
  } catch (err) {
    console.error("Error fetching partners:", err);
    res.status(500).json({ error: "Server error" });
  }
};