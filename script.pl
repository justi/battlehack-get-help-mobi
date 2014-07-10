#! /usr/bin/perl

use strict;
use warnings;
use Selenium::Remote::Driver;
my $caps = {
    'app' => '/opt/breakside/platforms/android/ant-build/Breakside-debug.apk',
    'app-package' => 'com.example.Breakside',
    'app-activity' => 'Breakside',
    'browserName' => '',
    'platformName' => 'android',
};

my $android = Selenium::Remote::Driver->new_from_caps(
    port => 4723,
    desired_capabilities => $caps
);

use DDP;
p $android;
sleep(60); # optional, if you want to see it open on your device
