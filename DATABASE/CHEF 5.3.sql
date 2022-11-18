-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2020 at 12:52 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.3.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopinnstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `addons`
--

CREATE TABLE `addons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `addon_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `addon_category_id` bigint(20) UNSIGNED NOT NULL,
  `store_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `addon_categories`
--

CREATE TABLE `addon_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `store_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `addon_category_items`
--

CREATE TABLE `addon_category_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `addon_category_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `store_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `application_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `application_email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `application_logo` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency_symbol` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_no` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `currency_symbol_location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'left'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`id`, `application_name`, `application_email`, `application_logo`, `currency_symbol`, `contact_no`, `Address`, `created_at`, `updated_at`, `currency_symbol_location`) VALUES
(10, 'Chef', 'chef@gmail.com', 'storage/account/RQTeFWSX7IVt16DOvolskz8tXg8EaEXAvcXTJQFt.png', '$', '12', 'ds', '2020-12-24 15:43:44', '2020-12-24 15:43:44', 'left');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `store_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fcm_notifications`
--

CREATE TABLE `fcm_notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `store_id` bigint(20) NOT NULL,
  `token` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `homes`
--

CREATE TABLE `homes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `privacy_policy` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_05_03_000001_create_customer_columns', 1),
(4, '2019_05_03_000002_create_subscriptions_table', 1),
(5, '2019_05_03_000003_create_subscription_items_table', 1),
(6, '2019_08_19_000000_create_failed_jobs_table', 1),
(7, '2020_07_26_181442_create_stores_table', 1),
(8, '2020_07_28_063143_create_categories_table', 1),
(9, '2020_07_28_064112_create_products_table', 1),
(10, '2020_08_07_064103_create_sliders_table', 1),
(11, '2020_08_07_121417_create_applications_table', 1),
(12, '2020_08_14_062341_create_customers_table', 1),
(13, '2020_08_22_110224_create_orders_table', 1),
(14, '2020_08_22_111523_create_order_details_table', 1),
(15, '2020_09_22_061733_create_store_sliders_table', 1),
(16, '2020_09_22_071602_create_tables_table', 1),
(17, '2020_09_24_082626_create_selected_subscriptions_table', 1),
(18, '2020_09_25_112220_create_settings_table', 1),
(19, '2020_09_28_134713_is_accept_order_to_stores_table', 1),
(20, '2020_09_28_142453_create_store_subscriptions_table', 1),
(21, '2020_10_05_144504_add_comments_to_orders', 1),
(22, '2020_10_24_215220_create_homes_table', 1),
(23, '2020_10_28_214619_create_addon_categories_table', 1),
(24, '2020_10_29_073727_create_addons_table', 1),
(25, '2020_10_31_195315_create_addon_category_items_table', 1),
(26, '2020_11_02_194241_create_order_detail_addons_table', 1),
(27, '2020_11_25_174537_create_fcm_notifications_table', 1),
(28, '2020_11_25_210259_add_table_code_to_users_table', 1),
(29, '2020_11_29_140609_create_waiter_calls_table', 1),
(30, '2020_12_15_170358_create_translations_table', 1),
(31, '2020_12_16_171918_add_extra_to_stores_table', 1),
(32, '2020_12_23_163530_add_gateway_name_to_selected_subscriptions_table', 2),
(33, '2020_12_24_175806_currency_symbol_location_to_applications', 3);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_unique_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `store_id` bigint(20) UNSIGNED NOT NULL,
  `table_no` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_total` decimal(8,2) DEFAULT NULL,
  `discount` decimal(8,2) DEFAULT NULL,
  `tax` decimal(8,2) DEFAULT NULL,
  `store_charge` decimal(8,2) DEFAULT NULL,
  `total` decimal(8,2) DEFAULT NULL,
  `status` bigint(20) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `comments` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `quantity` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_detail_addons`
--

CREATE TABLE `order_detail_addons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_detail_id` bigint(20) UNSIGNED NOT NULL,
  `addon_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `addon_price` decimal(8,2) NOT NULL,
  `addon_count` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `store_id` bigint(20) UNSIGNED NOT NULL,
  `is_veg` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double(8,2) NOT NULL,
  `cooking_time` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_recommended` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `selected_subscriptions`
--

CREATE TABLE `selected_subscriptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `subscription_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subscription_price` decimal(8,2) NOT NULL,
  `subscription_days` decimal(8,2) NOT NULL,
  `payment_status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_transactional_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `store_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `gateway_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `created_at`, `updated_at`) VALUES
(1, 'IsStripePaymentEnabled', '1', '2019-09-06 16:22:30', '2020-12-23 12:43:45'),
(2, 'Currency', 'inr', '2019-09-06 16:22:30', '2020-12-23 12:43:45'),
(3, 'StripePublishableKey', 'pk_test_FkQvi0DNueKlNnVwNoJktg2W', '2019-09-06 16:22:30', '2020-12-23 12:43:45'),
(4, 'StripeSecretKey', 'sk_test_hPRNV2gZ6gcIV99ndFejwEHT', '2019-09-06 16:22:30', '2020-12-23 12:43:45'),
(5, 'IsSandBoxEnabled', '1', '2019-09-06 16:22:30', '2019-09-06 16:22:30'),
(6, 'PhoneCode', '+14155238886', '2019-09-06 16:22:30', '2019-09-06 16:22:30'),
(7, 'SandBoxID', 'AC6122b6aa2b2e8e1145fd160a5b33a897', '2019-09-06 16:22:30', '2019-09-06 16:22:30'),
(8, 'SandBoxToken', 'a2159a513c58ba5101496a8192b3c959', '2019-09-06 16:22:30', '2019-09-06 16:22:30'),
(9, 'IsStoreEnabled', '1', '2020-10-06 16:22:30', '2020-10-06 16:22:30'),
(10, 'PrivacyPolicy', 'sample privacy policy text', '2019-09-06 16:22:30', '2019-09-06 16:22:30'),
(11, 'SandboxTrialText', 'join tongue-getting', '2020-10-06 16:22:30', '2020-10-06 16:22:30'),
(12, 'IsRazorpayPaymentEnabled', '1', '2019-09-06 16:22:30', '2020-12-23 12:43:45'),
(13, 'RazorpayKeyId', 'rzp_test_X3pUftNKua3iu2', '2019-09-06 16:22:30', '2020-12-23 12:43:45'),
(14, 'RazorpayKeySecret', 'xoy2fp6iHWRLEjVSUkvS7BlD', '2019-09-06 16:22:30', '2020-12-23 12:43:45');

-- --------------------------------------------------------

--
-- Table structure for table `sliders`
--

CREATE TABLE `sliders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_visible` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `store_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo_url` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `theme_id` bigint(20) DEFAULT NULL,
  `subscription_end_date` date NOT NULL,
  `is_visible` tinyint(1) NOT NULL DEFAULT 1,
  `add_by` bigint(20) DEFAULT NULL,
  `view_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_accept_order` tinyint(1) NOT NULL DEFAULT 1,
  `currency_symbol` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `service_charge` double(8,2) NOT NULL DEFAULT 0.00,
  `tax` double(8,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `store_sliders`
--

CREATE TABLE `store_sliders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `store_id` bigint(20) UNSIGNED NOT NULL,
  `photo_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_visible` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `store_subscriptions`
--

CREATE TABLE `store_subscriptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `days` bigint(20) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_one_time` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_plan` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL,
  `ends_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription_items`
--

CREATE TABLE `subscription_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `subscription_id` bigint(20) UNSIGNED NOT NULL,
  `stripe_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_plan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tables`
--

CREATE TABLE `tables` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `table_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `store_id` bigint(20) UNSIGNED NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `table_code` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `translations`
--

CREATE TABLE `translations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `language_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_rlt` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `translations`
--

INSERT INTO `translations` (`id`, `language_name`, `data`, `is_rlt`, `is_active`, `is_default`, `created_at`, `updated_at`) VALUES
(1, 'English', '{\"language_name\":\"English\",\"home\":\"Home\",\"how_it_works\":\"How It Works?\",\"service\":\"Service\",\"pricing\":\"Pricing\",\"privacy_policy\":\"Privacy Policy\",\"login\":\"Login\",\"register\":\"Register\",\"home_first_title\":\"Re-open your restaurants\",\"home_first_sub_title\":\"With a contactless CHEF <b>MENU<\\/b>.<br>Make your restaurant a safe place to eat or grab-and-go by deploying a touch-free QR Code menu.\",\"register_footer_subtitle\":\"Create Account to get started.\",\"create_menu\":\"Create Menu\",\"create_menu_footer_subtitle\":\"Create your menu visible for your customers.\",\"print_qr_code\":\"Print QR Code\",\"print_qr_code_footer_subtitle\":\"Put the printed tags on your tables.\",\"receive_orders\":\"Receive Orders\",\"receive_orders_footer_subtitle\":\"When they order something, you get notified instantly!\",\"why_contactless_menu\":\"Why Contactless Menu?\",\"safety_first\":\"Safety First\",\"safety_first_sub_title\":\"Limiting the use of physical menus and promoting touchless QR Code menus reduces the risk of virus transmission, and keeps your customers and employees safe.\",\"no_app_download_required\":\"No App Download Required\",\"no_app_download_required_sub_title\":\"Your diners can scan the QR Code using their phone\'s camera\",\"easy_to_build_update\":\"Easy To Build & Update\",\"easy_to_build_update_sub_title\":\"Create contactless menu QR Codes under 3 minutes. Later, upload & save a new menu to the same QR Code.\",\"inspires_the_confidence\":\"Inspires The Confidence To Step Out\",\"inspires_the_confidence_sub_title\":\"Re-align your restaurant functioning with contactless at the core.\",\"give_us_call\":\"Give us a Call\",\"send_us_message\":\"Send us a Message\",\"visit_our_location\":\"Visit our Location\",\"crafted_with_love\":\"Crafted with <3 by\",\"benefits_contactless_menu\":\"Benefits Of A Contactless Menu\",\"safer_to_use\":\"Safer To Use\",\"safer_to_use_sub_title\":\"Germ-free, greener, quicker and safer than the traditional menu.\",\"covid_compliant\":\"COVID Compliant\",\"covid_compliant_sub_title\":\"COVID compliance without single use paper menus or disinfectant.\",\"easy_to_update\":\"Easy To Update\",\"easy_to_update_sub_title\":\"Use the menu builder to instantly change your menu. No re-prints!\",\"see_a_demo_menu\":\"See A Demo Online Menu\",\"see_a_demo_menu_point1\":\"Use the phone camera or QR Application to scan the code.\",\"see_a_demo_menu_point2\":\"Scroll around the menu and make your order.\",\"see_a_demo_menu_point3\":\"Your order is instantly received, and it\\u2019s coming!\",\"call_the_waiter\":\"Call the Waiter\",\"search_products\":\"Search for Products...\",\"menu_categories\":\"Categories\",\"menu_promo\":\"Promos for you\",\"menu_recommend\":\"Recommend for you\",\"menu_custom\":\"CUSTOM\",\"menu_name\":\"Name\",\"menu_phone_number\":\"Phone Number\",\"menu_comment\":\"Comment\",\"select_your_table\":\"Select Your Table\",\"enter_your_table_code\":\"Enter Your Table Code\",\"table_code_error_message\":\"INVALID TABLE CODE\\/PLEASE ENTER A VALID CODE\",\"menu_subtotal\":\"Subtotal\",\"menu_service_charge\":\"Service Charge\",\"menu_tax\":\"Tax\",\"menu_total_cost\":\"Total Cost\",\"menu_confirm_order\":\"Confirm your order.\",\"menu\":\"Menu\",\"cart\":\"Cart\",\"my_order\":\"My Order\",\"customizable\":\"CUSTOMIZABLE\",\"available\":\"AVAILABLE\",\"not_available\":\"NOT AVAILABLE\",\"recommended\":\"RECOMMENDED\",\"menu_close\":\"Close\",\"menu_save_changes\":\"Save Changes\",\"menu_add_to_cart\":\"Add to Cart\",\"item_add_to_cart\":\"Item Added To Cart\",\"menu_rec\":\"REC\",\"menu_order_successmsg\":\"Order Placed Successfully.\",\"menu_check_orderstatus\":\"Check Order Status\",\"menu_cart_empty\":\"Your Cart is empty.\",\"back_to_menu\":\"Back to Menu\",\"menu_mrp\":\"MRP\",\"cooking_time\":\"Cooking Time\",\"cooking_time_unit\":\"Cooking Time\",\"menu_product_details\":\"Product Details\",\"menu_maybe_you_likethis\":\"Maybe You Like this.\",\"menu_category_items\":\"Items\",\"menu_customizations_text\":\"Customization\",\"menu_search_order\":\"Search Order\",\"menu_current_order\":\"Current Order\",\"menu_completed_order\":\"Completed Order\",\"menu_order_id\":\"Order ID\",\"menu_store\":\"Store\",\"menu_bill_amount\":\"Bill Amount\",\"call_the_waite_now\":\"Call Now\",\"calling_waiter_msg\":\"calling waiter ....\",\"order_status_pending\":\"Pending\",\"order_status_accepted\":\"Accepted\",\"order_status_ready\":\"Ready to Serve\",\"order_status_completed\":\"Completed\"}', 0, 1, 1, '2020-12-20 14:10:03', '2020-12-20 14:10:03');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `stripe_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_brand` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_last_four` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `stripe_id`, `card_brand`, `card_last_four`, `trial_ends_at`) VALUES
(1, 'Admin', 'admin@admin.com', NULL, '$2y$10$vqPRsaJZFOT4EzFYcZZ7aO2GAdBQ.LCtzd2bhkSVad/5n3IfsZNRG', NULL, '2020-12-20 14:09:44', '2020-12-20 14:09:44', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `waiter_calls`
--

CREATE TABLE `waiter_calls` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_phone` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `table_name` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_id` bigint(20) UNSIGNED NOT NULL,
  `is_completed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addons`
--
ALTER TABLE `addons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addons_store_id_foreign` (`store_id`),
  ADD KEY `addons_addon_category_id_foreign` (`addon_category_id`);

--
-- Indexes for table `addon_categories`
--
ALTER TABLE `addon_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addon_categories_store_id_foreign` (`store_id`);

--
-- Indexes for table `addon_category_items`
--
ALTER TABLE `addon_category_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addon_category_items_addon_category_id_foreign` (`addon_category_id`),
  ADD KEY `addon_category_items_product_id_foreign` (`product_id`),
  ADD KEY `addon_category_items_store_id_foreign` (`store_id`);

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categories_store_id_foreign` (`store_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fcm_notifications`
--
ALTER TABLE `fcm_notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `homes`
--
ALTER TABLE `homes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_store_id_foreign` (`store_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_details_order_id_foreign` (`order_id`);

--
-- Indexes for table `order_detail_addons`
--
ALTER TABLE `order_detail_addons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_detail_addons_order_detail_id_foreign` (`order_detail_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`),
  ADD KEY `products_store_id_foreign` (`store_id`);

--
-- Indexes for table `selected_subscriptions`
--
ALTER TABLE `selected_subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `selected_subscriptions_store_id_foreign` (`store_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sliders`
--
ALTER TABLE `sliders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `stores_email_unique` (`email`);

--
-- Indexes for table `store_sliders`
--
ALTER TABLE `store_sliders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `store_sliders_store_id_foreign` (`store_id`);

--
-- Indexes for table `store_subscriptions`
--
ALTER TABLE `store_subscriptions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subscriptions_user_id_stripe_status_index` (`user_id`,`stripe_status`);

--
-- Indexes for table `subscription_items`
--
ALTER TABLE `subscription_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subscription_items_subscription_id_stripe_plan_unique` (`subscription_id`,`stripe_plan`),
  ADD KEY `subscription_items_stripe_id_index` (`stripe_id`);

--
-- Indexes for table `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tables_store_id_foreign` (`store_id`);

--
-- Indexes for table `translations`
--
ALTER TABLE `translations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_stripe_id_index` (`stripe_id`);

--
-- Indexes for table `waiter_calls`
--
ALTER TABLE `waiter_calls`
  ADD PRIMARY KEY (`id`),
  ADD KEY `waiter_calls_store_id_foreign` (`store_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addons`
--
ALTER TABLE `addons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `addon_categories`
--
ALTER TABLE `addon_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `addon_category_items`
--
ALTER TABLE `addon_category_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fcm_notifications`
--
ALTER TABLE `fcm_notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `homes`
--
ALTER TABLE `homes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_detail_addons`
--
ALTER TABLE `order_detail_addons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `selected_subscriptions`
--
ALTER TABLE `selected_subscriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `sliders`
--
ALTER TABLE `sliders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `store_sliders`
--
ALTER TABLE `store_sliders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `store_subscriptions`
--
ALTER TABLE `store_subscriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscription_items`
--
ALTER TABLE `subscription_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tables`
--
ALTER TABLE `tables`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `translations`
--
ALTER TABLE `translations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `waiter_calls`
--
ALTER TABLE `waiter_calls`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addons`
--
ALTER TABLE `addons`
  ADD CONSTRAINT `addons_addon_category_id_foreign` FOREIGN KEY (`addon_category_id`) REFERENCES `addon_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `addons_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `addon_categories`
--
ALTER TABLE `addon_categories`
  ADD CONSTRAINT `addon_categories_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `addon_category_items`
--
ALTER TABLE `addon_category_items`
  ADD CONSTRAINT `addon_category_items_addon_category_id_foreign` FOREIGN KEY (`addon_category_id`) REFERENCES `addon_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `addon_category_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `addon_category_items_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_detail_addons`
--
ALTER TABLE `order_detail_addons`
  ADD CONSTRAINT `order_detail_addons_order_detail_id_foreign` FOREIGN KEY (`order_detail_id`) REFERENCES `order_details` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `selected_subscriptions`
--
ALTER TABLE `selected_subscriptions`
  ADD CONSTRAINT `selected_subscriptions_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `store_sliders`
--
ALTER TABLE `store_sliders`
  ADD CONSTRAINT `store_sliders_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tables`
--
ALTER TABLE `tables`
  ADD CONSTRAINT `tables_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `waiter_calls`
--
ALTER TABLE `waiter_calls`
  ADD CONSTRAINT `waiter_calls_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
