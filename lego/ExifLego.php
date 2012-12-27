<?php

//Lego for processing EXIF data

class GpsHelper
{

	function getGps($exifCoord, $hemi) {

	    $degrees = count($exifCoord) > 0 ? $this->gps2Num($exifCoord[0]) : 0;
	    $minutes = count($exifCoord) > 1 ? $this->gps2Num($exifCoord[1]) : 0;
	    $seconds = count($exifCoord) > 2 ? $this->gps2Num($exifCoord[2]) : 0;

	    $flip = ($hemi == 'W' or $hemi == 'S') ? -1 : 1;

	    return $flip * ($degrees + $minutes / 60 + $seconds / 3600);

	}

	function gps2Num($coordPart) {

	    $parts = explode('/', $coordPart);

	    if (count($parts) <= 0)
	        return 0;

	    if (count($parts) == 1)
	        return $parts[0];

	    return floatval($parts[0]) / floatval($parts[1]);
	}

}

function getExifCoords ($imgPath) {
	$exif = exif_read_data($imgPath);
	$gpsHelper = new GpsHelper();

	$lon = $gpsHelper->getGps($exif["GPSLongitude"], $exif['GPSLongitudeRef']);
	$lat = $gpsHelper->getGps($exif["GPSLatitude"], $exif['GPSLatitudeRef']);

	unset($gpsHelper);
	return $lon . ", " . $lat;
}

?>