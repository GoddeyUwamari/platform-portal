/**
 * Stripe Routes
 * Handles Stripe payment and subscription endpoints
 */
import { Router } from 'express';
import express from 'express'; // ✅ ADD THIS
import { stripeController } from '../controllers/stripe.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Webhook route MUST come FIRST and use raw body
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }), // ✅ RAW BODY FOR STRIPE
  stripeController.handleWebhook.bind(stripeController)
);

// All other Stripe routes require authentication
router.post(
  '/create-checkout-session',
  authenticate,
  stripeController.createCheckoutSession.bind(stripeController)
);

router.post(
  '/customer-portal',
  authenticate,
  stripeController.createCustomerPortal.bind(stripeController)
);

router.get(
  '/subscription',
  authenticate,
  stripeController.getSubscription.bind(stripeController)
);

router.post(
  '/cancel-subscription',
  authenticate,
  stripeController.cancelSubscription.bind(stripeController)
);

router.post(
  '/resume-subscription',
  authenticate,
  stripeController.resumeSubscription.bind(stripeController)
);

router.get(
  '/invoices',
  authenticate,
  stripeController.getInvoices.bind(stripeController)
);

export default router;