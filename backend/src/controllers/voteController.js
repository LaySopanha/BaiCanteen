const { User, Vote, sequelize } = require('../models');
const { Op } = require('sequelize');

const voteController = {
  async castVote(req, res) {
    const t = await sequelize.transaction();

    try {
      const { vendorId } = req.body;
      const studentId = req.user.id;
      const currentPeriod = new Date().toISOString().slice(0, 7);

      // Check if student has already voted this period
      const existingVote = await Vote.findOne({
        where: {
          studentId,
          votingPeriod: currentPeriod
        }
      }, { transaction: t });

      if (existingVote) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: 'You have already voted this period'
        });
      }

      // Verify vendor exists
      const vendor = await User.findOne({
        where: {
          id: vendorId,
          role: 'vendor'
        }
      }, { transaction: t });

      if (!vendor) {
        await t.rollback();
        return res.status(404).json({
          success: false,
          message: 'Vendor not found'
        });
      }

      // Create new vote
      await Vote.create({
        studentId,
        vendorId,
        votingPeriod: currentPeriod
      }, { transaction: t });

      await t.commit();

      res.status(201).json({
        success: true,
        message: 'Vote cast successfully'
      });
    } catch (error) {
      await t.rollback();
      res.status(500).json({
        success: false,
        message: 'Error casting vote',
        error: error.message
      });
    }
  },

  async getResults(req, res) {
    try {
      const currentPeriod = new Date().toISOString().slice(0, 7);

      const results = await Vote.findAll({
        where: {
          votingPeriod: currentPeriod
        },
        attributes: [
          'vendorId',
          [sequelize.fn('COUNT', sequelize.col('id')), 'voteCount']
        ],
        include: [{
          model: User,
          as: 'vendor',
          attributes: ['name']
        }],
        group: ['vendorId', 'vendor.id'],
        order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']]
      });

      // Calculate percentages
      const totalVotes = results.reduce((sum, result) => sum + parseInt(result.dataValues.voteCount), 0);
      const formattedResults = results.map(result => ({
        vendorName: result.vendor.name,
        voteCount: parseInt(result.dataValues.voteCount),
        percentage: ((result.dataValues.voteCount / totalVotes) * 100).toFixed(2)
      }));

      res.json({
        success: true,
        results: formattedResults
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching results',
        error: error.message
      });
    }
  },

  async checkVoteStatus(req, res) {
    try {
      const studentId = req.user.id;
      const currentPeriod = new Date().toISOString().slice(0, 7);

      const vote = await Vote.findOne({
        where: {
          studentId,
          votingPeriod: currentPeriod
        },
        include: [{
          model: User,
          as: 'vendor',
          attributes: ['name']
        }]
      });

      res.json({
        success: true,
        hasVoted: !!vote,
        vote: vote ? {
          vendorName: vote.vendor.name,
          votingPeriod: vote.votingPeriod,
          votedAt: vote.createdAt
        } : null
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error checking vote status',
        error: error.message
      });
    }
  }
};

module.exports = voteController;